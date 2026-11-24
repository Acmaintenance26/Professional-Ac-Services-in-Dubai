import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_NOTIFY_EMAIL = "info@acmaintenancedubai.ae";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipSubmissionTracker = new Map<string, number[]>();

// Periodically prune stale IP timestamps so memory stays bounded
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  for (const [ip, timestamps] of ipSubmissionTracker.entries()) {
    const active = timestamps.filter((ts) => ts > cutoff);
    if (active.length === 0) {
      ipSubmissionTracker.delete(ip);
    } else {
      ipSubmissionTracker.set(ip, active);
    }
  }
}, 5 * 60 * 1000).unref();

function getClientIp(req: express.Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function checkRateLimit(req: express.Request, res: express.Response): boolean {
  const ip = getClientIp(req);
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipSubmissionTracker.get(ip) || []).filter((ts) => ts > cutoff);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many submissions from your connection. Please wait a few minutes or call us directly.",
    });
    return false;
  }

  recent.push(now);
  ipSubmissionTracker.set(ip, recent);
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMultilineHtml(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function cleanInput(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface SendMailOptions {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

class SmtpConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SmtpConfigError";
  }
}

async function sendMail({ subject, text, html, replyTo }: SendMailOptions): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM?.trim() || (user ? `AC Maintenance Dubai <${user}>` : "");
  const to = process.env.NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL;

  if (!host || !user || !pass) {
    throw new SmtpConfigError(
      "Email delivery is not configured on the server (missing SMTP_HOST, SMTP_USER, or SMTP_PASS)."
    );
  }

  const port = portRaw ? Number(portRaw) : 587;
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new SmtpConfigError("Email delivery configuration is invalid (invalid SMTP_PORT).");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject: sanitizeHeader(subject),
    text,
    html,
    ...(replyTo && isValidEmail(replyTo) ? { replyTo: sanitizeHeader(replyTo) } : {}),
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.set("trust proxy", 1);
  app.use(express.json({ limit: "64kb" }));

  // Helper for lazy Gemini initialization
  function getGenAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Health endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", company: "AC Maintenance Dubai" });
  });

  // Text-To-Speech (TTS) endpoint using gemini-3.1-flash-tts-preview
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice = "Kore" } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text parameter is required" });
      }

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Speak in a friendly, crisp, professional customer support voice for AC Maintenance Dubai: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: "No audio stream returned from Gemini API" });
      }

      res.json({ audio: base64Audio });
    } catch (err: any) {
      console.error("TTS Endpoint Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate speech" });
    }
  });

  // Booking submit endpoint
  app.post("/api/bookings", async (req, res) => {
    if (!checkRateLimit(req, res)) return;

    const body = req.body && typeof req.body === "object" ? req.body : {};

    // Honeypot check: silently accept bot submissions without sending email
    if (cleanInput(body.website, 200)) {
      const fakeId = "ACD-" + Math.floor(100000 + Math.random() * 900000);
      return res.json({
        success: true,
        referenceId: fakeId,
        message: "Thank you! Your booking request has been received.",
      });
    }

    const fullName = cleanInput(body.fullName ?? body.name, 120);
    const phone = cleanInput(body.phone, 40);
    const email = cleanInput(body.email, 254);
    const serviceRequired = cleanInput(body.serviceRequired ?? body.service, 160);
    const location = cleanInput(body.location, 120);
    const preferredDate = cleanInput(body.preferredDate, 40);
    const preferredTime = cleanInput(body.preferredTime, 80);
    const message = cleanInput(body.message, 2000);

    if (!fullName || !phone || !serviceRequired || !location) {
      return res.status(400).json({
        error: "Please fill in all required fields (Full Name, Phone, Service, Location).",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address or leave it blank.",
      });
    }

    const referenceId = "ACD-" + Math.floor(100000 + Math.random() * 900000);
    const subject = `New Booking #${referenceId} - ${serviceRequired} - ${fullName}`;

    const textBody = [
      `New AC Service Booking (#${referenceId})`,
      `----------------------------------------`,
      `Full Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Service Required: ${serviceRequired}`,
      `Location: ${location}`,
      `Preferred Date: ${preferredDate || "Not specified"}`,
      `Preferred Time: ${preferredTime || "Not specified"}`,
      `Message / Issue Description:`,
      `${message || "None"}`,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px 24px;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; font-weight: bold;">AC Maintenance Dubai</p>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Booking #${escapeHtml(referenceId)}</h2>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 150px; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a;">${email ? escapeHtml(email) : "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service Required:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${escapeHtml(serviceRequired)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Location:</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(location)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #0f172a;">${preferredDate ? escapeHtml(preferredDate) : "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Preferred Time:</td>
              <td style="padding: 8px 0; color: #0f172a;">${preferredTime ? escapeHtml(preferredTime) : "Not specified"}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p style="margin: 0 0 6px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Message / Issue Description</p>
            <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.5;">${message ? formatMultilineHtml(message) : "None"}</p>
          </div>
        </div>
      </div>
    `;

    try {
      await sendMail({
        subject,
        text: textBody,
        html: htmlBody,
        replyTo: email || undefined,
      });

      return res.json({
        success: true,
        referenceId,
        message: `Thank you ${fullName}! Your booking request (#${referenceId}) for ${serviceRequired} has been received. Our technician will call you at ${phone} to confirm schedule.`,
        data: { fullName, phone, email, serviceRequired, location, preferredDate, preferredTime, message },
      });
    } catch (err: any) {
      if (err instanceof SmtpConfigError) {
        console.error("Booking email configuration error:", err.message);
        return res.status(503).json({
          error: "Booking email service is currently unavailable due to missing server email configuration. Please call or WhatsApp us directly.",
        });
      }
      console.error("Booking email delivery error:", err?.message || err);
      return res.status(500).json({
        error: "We could not send your booking notification email right now. Please try again or contact us by phone/WhatsApp.",
      });
    }
  });

  // Contact enquiry endpoint
  app.post("/api/contact", async (req, res) => {
    if (!checkRateLimit(req, res)) return;

    const body = req.body && typeof req.body === "object" ? req.body : {};

    // Honeypot check: silently accept bot submissions without sending email
    if (cleanInput(body.website, 200)) {
      return res.json({
        success: true,
        message: "Thank you for reaching out. Our team will get back to you shortly.",
      });
    }

    const name = cleanInput(body.name, 120);
    const phone = cleanInput(body.phone, 40);
    const email = cleanInput(body.email, 254);
    const message = cleanInput(body.message, 2000);

    if (!name || !phone || !message) {
      return res.status(400).json({
        error: "Please fill in all required fields (Name, Phone Number, Message).",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        error: "Please provide a valid email address or leave it blank.",
      });
    }

    const textBody = [
      `New Website Enquiry`,
      `----------------------------------------`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Message:`,
      `${message}`,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0284c7; color: #ffffff; padding: 20px 24px;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #e0f2fe; font-weight: bold;">AC Maintenance Dubai</p>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Website Enquiry</h2>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-weight: bold;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a;">${email ? escapeHtml(email) : "Not provided"}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p style="margin: 0 0 6px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Message</p>
            <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.5;">${formatMultilineHtml(message)}</p>
          </div>
        </div>
      </div>
    `;

    try {
      await sendMail({
        subject: "New Website Enquiry",
        text: textBody,
        html: htmlBody,
        replyTo: email || undefined,
      });

      return res.json({
        success: true,
        message: "Thank you for reaching out. Our customer desk will call or email you back shortly.",
      });
    } catch (err: any) {
      if (err instanceof SmtpConfigError) {
        console.error("Contact email configuration error:", err.message);
        return res.status(503).json({
          error: "Contact email service is currently unavailable due to missing server email configuration. Please call or WhatsApp us directly.",
        });
      }
      console.error("Contact email delivery error:", err?.message || err);
      return res.status(500).json({
        error: "We could not send your enquiry right now. Please try again or contact us by phone/WhatsApp.",
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AC Maintenance Dubai] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

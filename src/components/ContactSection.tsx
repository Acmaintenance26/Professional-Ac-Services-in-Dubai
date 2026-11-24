import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Send, 
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Navigation,
  Loader2
} from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";

export const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please fill in all required fields (Name, Phone Number, Message).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
      setForm({ name: "", phone: "", email: "", message: "" });
      setWebsite("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Get In Touch With Our Dubai Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact AC Maintenance Dubai
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Need urgent AC repair or want to request a free site inspection quote? Call, WhatsApp, or visit us in Deira, Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Company Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{COMPANY_DETAILS.name}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{COMPANY_DETAILS.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Hotline</h4>
                  <a href={`tel:${COMPANY_DETAILS.phoneFormatted}`} className="text-sm font-black text-sky-600 hover:underline">
                    {COMPANY_DETAILS.phone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">24/7 Emergency Support</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-1">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Chat</h4>
                  <a 
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=Hi,%20I%20have%20an%20inquiry%20about%20AC%20services`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-black text-emerald-600 hover:underline"
                  >
                    {COMPANY_DETAILS.whatsapp}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant Response in English & Arabic</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</h4>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-sm font-bold text-amber-600 hover:underline">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Working Hours</h4>
                  <p className="text-xs text-slate-800 font-medium mt-0.5">{COMPANY_DETAILS.workingHours}</p>
                </div>
              </div>

              {/* Interactive Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <a
                  href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
                  className="py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=Hi,%20I%20need%20AC%20repair%20in%20Dubai`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>

                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 col-span-2"
                >
                  <Mail className="w-4 h-4" /> Email Us ({COMPANY_DETAILS.email})
                </a>
              </div>

            </div>
          </div>

          {/* Right Column - Map View & Send Message */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Interactive Map Container */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-bold text-slate-900">Deira, Dubai HQ Location</span>
                </div>
                <a
                  href={COMPANY_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map iFrame */}
              <div className="w-full h-[240px] rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title="AC Maintenance Dubai HQ Map Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=25.2697,55.3095&hl=en&z=14&output=embed"
                />
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Have a custom HVAC query or commercial building project? Fill in your details below.
              </p>

              {sent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                  <p className="text-xs">Thank you for reaching out. Our customer desk will call or email you back shortly.</p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setError(null);
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="info@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we help with your AC system?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

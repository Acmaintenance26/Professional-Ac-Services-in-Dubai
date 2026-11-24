import React, { useState } from "react";
import { 
  Wind, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Heart, 
  X 
} from "lucide-react";
import { COMPANY_DETAILS, SERVICES_DATA } from "../data/hvacData";
import { Logo } from "./Logo";

interface FooterProps {
  onOpenBooking: (serviceName?: string) => void;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": "AC Maintenance Dubai",
    "image": "https://alnaveedac.com/logo.png",
    "@id": "https://alnaveedac.com",
    "url": "https://alnaveedac.com",
    "telephone": COMPANY_DETAILS.phone,
    "email": COMPANY_DETAILS.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "28C Street, Deira",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2697,
      "longitude": 55.3095
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com"
    ],
    "priceRange": "$$"
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-900 relative">
      
      {/* Schema.org LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home">
              <Logo variant="light" size="lg" showTagline={true} />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dubai's premier HVAC service company providing 24/7 emergency AC repair, gas refills, deep duct cleaning, and preventive maintenance across residential and commercial properties in Dubai.
            </p>

            <div className="flex items-center gap-2 text-slate-300 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Licensed HVAC Company in Dubai, UAE</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate("home")} className="hover:text-sky-400 text-left transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate("services")} className="hover:text-sky-400 text-left transition-colors">AC Services</button></li>
              <li><button onClick={() => onNavigate("about")} className="hover:text-sky-400 text-left transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate("blog")} className="hover:text-sky-400 text-left transition-colors text-sky-400 font-bold">Blog Journal</button></li>
              <li><button onClick={() => onNavigate("contact")} className="hover:text-sky-400 text-left transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onOpenBooking(s.title)}
                    className="hover:text-sky-400 text-left transition-colors"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>28C Street, Deira, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneFormatted}`} className="text-white font-bold hover:text-sky-400">
                  {COMPANY_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 font-bold hover:underline"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-sky-400">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>24/7 Emergency Dispatch</span>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Keywords Natural Text Block */}
        <div className="py-8 border-b border-slate-900 text-[11px] text-slate-500 space-y-2">
          <p className="font-semibold text-slate-400">Popular AC Service Searches in Dubai:</p>
          <p className="leading-relaxed">
            AC Maintenance Dubai • AC Repair Dubai • AC Service Dubai • AC Gas Refill Dubai • AC Technician Dubai • HVAC Services Dubai • Split AC Repair Dubai • Central AC Maintenance Dubai • AC Duct Cleaning Dubai • Emergency AC Repair Dubai • Daikin AC Repair • O General AC Maintenance • Chiller Service Dubai • AC Water Leak Repair Deira
          </p>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} AC Maintenance Dubai ({COMPANY_DETAILS.legalName}). All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Modal for Privacy Policy & Terms */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl max-w-xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4 capitalize">
              {modalType === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </h3>

            {modalType === "privacy" ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>AC Maintenance Dubai respects your privacy. We collect personal information (such as your name, phone number, email address, and service location) exclusively to schedule AC repair visits and communicate regarding your booking.</p>
                <p>We do not sell or lease your personal contact details to third parties. All booking information submitted through our website is encrypted and processed securely.</p>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <p>By requesting AC maintenance or repair services through this website, you agree to our standard service terms:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>On-site inspection and quote approval before initiating major repairs.</li>
                  <li>30 to 90 days service warranty on replaced OEM spare parts and labor workmanship.</li>
                  <li>Emergency callout times subject to traffic and weather conditions in Dubai.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

    </footer>
  );
};

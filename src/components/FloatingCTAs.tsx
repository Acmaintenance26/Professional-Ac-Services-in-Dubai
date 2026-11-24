import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";

export const FloatingCTAs: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=Hi,%20I%20need%20AC%20maintenance%20in%20Dubai`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Us"
        className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-emerald-400/40"
      >
        <span className="hidden sm:inline font-bold">Chat on WhatsApp</span>
        <MessageSquare className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
      </a>

      {/* Call Hotline Floating Button */}
      <a
        href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
        aria-label="Call AC Service Hotline"
        className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-sky-400/40"
      >
        <span className="hidden sm:inline font-bold">24/7 Call: {COMPANY_DETAILS.phone}</span>
        <Phone className="w-5 h-5 group-hover:animate-bounce" />
      </a>

    </div>
  );
};

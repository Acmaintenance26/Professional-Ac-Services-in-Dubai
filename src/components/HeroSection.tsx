import React, { useState } from "react";
import { 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Flame,
  Sparkles
} from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";
import { AudioAssistant } from "./AudioAssistant";

interface HeroSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [quickService, setQuickService] = useState("AC Maintenance Dubai");
  const [quickLocation, setQuickLocation] = useState("Deira");

  const heroImage = "/src/assets/images/ac_technician_dubai_1784725537354.jpg";

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(quickService);
  };

  return (
    <section id="home" className="relative min-h-[600px] bg-gradient-to-b from-sky-50/90 via-white to-slate-50 text-slate-900 overflow-hidden py-12 lg:py-20 flex items-center border-b border-slate-200/80">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src={heroImage}
          alt="Professional AC technician repairing air conditioner in Dubai"
          className="w-full h-full object-cover object-center filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Alert Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-900 text-xs font-bold shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Same-Day AC Service Available Across Dubai Today</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-orange-500">AC Repair & Maintenance</span> Services in Dubai
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Fast, Reliable & Affordable AC Services for Homes, Offices & Commercial Buildings. Same-Day Service Available Across Dubai with Guaranteed Satisfaction.
            </p>

            {/* Key Service Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2 bg-white/90 p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>30-Min Response</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-3 rounded-2xl border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Certified Technicians</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=Hi,%20I%20need%20urgent%20AC%20service%20in%20Dubai`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-sm border border-sky-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Audio Assistant Feature Bar */}
            <div className="pt-2">
              <AudioAssistant 
                variant="card"
                textToSpeak="Welcome to AC Maintenance Dubai. We are Dubai's trusted HVAC service providers. Whether you need urgent AC repair, gas top-up, duct cleaning, or central unit maintenance, our team is available 24/7 with same-day guaranteed service."
              />
            </div>

            {/* Trust Reviews Rating */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-200/80">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900 font-bold">4.9/5 Rating</strong> from 2,800+ Dubai Homeowners & Businesses
              </p>
            </div>

          </div>

          {/* Right Column - Quick Lead Booking Form Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-orange-500 to-amber-500" />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> Instant Dispatch
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Get Free AC Inspection
                  </h3>
                </div>
                <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                  Dubai Wide
                </span>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Required Service
                  </label>
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                  >
                    <option value="AC Maintenance Dubai">AC Maintenance Dubai</option>
                    <option value="AC Repair Dubai">AC Repair Dubai</option>
                    <option value="AC Gas Refill">AC Gas Refill (R410A / R22 / R32)</option>
                    <option value="AC Installation">AC Installation & Fitting</option>
                    <option value="AC Duct Cleaning">AC Duct Cleaning & Sanitization</option>
                    <option value="Split AC Service">Split AC Service</option>
                    <option value="Central AC Maintenance">Central AC Maintenance</option>
                    <option value="Emergency AC Repair">Emergency AC Repair (24/7)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Location in Dubai
                  </label>
                  <select
                    value={quickLocation}
                    onChange={(e) => setQuickLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                  >
                    <option value="Deira">Deira, Dubai</option>
                    <option value="Bur Dubai">Bur Dubai</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Business Bay">Business Bay</option>
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="JLT">Jumeirah Lakes Towers (JLT)</option>
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="JVC">Jumeirah Village Circle (JVC)</option>
                    <option value="Mirdif">Mirdif</option>
                    <option value="Al Barsha">Al Barsha</option>
                    <option value="Other Dubai Area">Other Dubai Area</option>
                  </select>
                </div>

                <div className="bg-sky-50 rounded-xl p-3 border border-sky-100 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-900 leading-snug">
                    <strong className="font-bold">Transparent Quote:</strong> Technician arrives within 30 mins with diagnostic tools & genuine OEM spare parts.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Continue to Book Appointment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Direct Hotline:</span>
                <a href={`tel:${COMPANY_DETAILS.phoneFormatted}`} className="font-bold text-slate-900 hover:text-sky-600">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

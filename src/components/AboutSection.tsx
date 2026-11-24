import React from "react";
import { 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  PhoneCall,
  Sparkles
} from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";

export const AboutSection: React.FC = () => {
  const aboutImage = "/src/assets/images/central_ac_dubai_1784725553591.jpg";

  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Image with Overlay Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60">
              <img
                src={aboutImage}
                alt="HVAC technicians working on central air conditioning in Dubai"
                className="w-full h-[400px] sm:h-[480px] object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                    12+
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Years Serving Dubai</h4>
                    <p className="text-xs text-slate-300">Trusted by over 15,000 villa & business owners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> About Our Company
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Dubai's Most Trusted AC Maintenance & HVAC Specialists
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At <strong className="text-white font-semibold">AC Maintenance Dubai</strong> (operated by {COMPANY_DETAILS.legalName}), we deliver fast, reliable, and affordable air conditioning repair, gas refill, duct cleaning, and preventive servicing for homes, villas, retail outlets, and commercial towers across Dubai.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Equipped with state-of-the-art diagnostic instruments and high-pressure chemical jet washers, our team of certified HVAC technicians arrives promptly at your doorstep to resolve cooling issues with zero hassle and total transparency.
            </p>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <Users className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Certified Technicians</h4>
                  <p className="text-xs text-slate-400">Trained on all major brands like Daikin, O General, LG, Mitsubishi & York.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Rapid Response</h4>
                  <p className="text-xs text-slate-400">Mobile units stationed across Deira, Marina, Downtown, and JVC for 30-min dispatch.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Guaranteed Warranty</h4>
                  <p className="text-xs text-slate-400">30 to 90 days warranty on all spare parts and repair workmanship.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Fair Transparent Rates</h4>
                  <p className="text-xs text-slate-400">Upfront quotes provided before starting work. No surprise hidden charges.</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/25 text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {COMPANY_DETAILS.phone}</span>
              </a>

              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>28C Street, Deira, Dubai, UAE</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

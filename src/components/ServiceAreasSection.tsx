import React from "react";
import { MapPin, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { SERVICE_AREAS } from "../data/hvacData";

export const ServiceAreasSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Coverage Across United Arab Emirates
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AC Service Areas In Dubai
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            We operate mobile HVAC technician units positioned across all major residential and commercial districts in Dubai for rapid same-day dispatch.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {SERVICE_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{area.name}</h4>
                  <span className="text-[10px] text-slate-500">{area.region}</span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                {area.responseTime}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-sky-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-800 rounded-xl">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">Don't See Your Area Listed?</h4>
              <p className="text-xs text-slate-200">We service 100% of Dubai! Call us for instant emergency dispatch.</p>
            </div>
          </div>

          <a
            href="tel:+971502977603"
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md shrink-0 transition-colors"
          >
            Call Dispatch (+971 50 297 7603)
          </a>
        </div>

      </div>
    </section>
  );
};

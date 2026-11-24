import React from "react";
import { ShieldCheck, Award, Wrench } from "lucide-react";

export const BrandsShowcase: React.FC = () => {
  const BRANDS = [
    { name: "O General", country: "Japan", Popular: true },
    { name: "Daikin", country: "Japan", Popular: true },
    { name: "Mitsubishi Electric", country: "Japan", Popular: true },
    { name: "LG Electronics", country: "Korea", Popular: true },
    { name: "Carrier", country: "USA", Popular: true },
    { name: "Gree", country: "Global", Popular: true },
    { name: "York", country: "USA", Popular: false },
    { name: "Panasonic", country: "Japan", Popular: false },
    { name: "Samsung", country: "Korea", Popular: false },
    { name: "Trane", country: "USA", Popular: false },
    { name: "Rheem", country: "USA", Popular: false },
    { name: "Super General", country: "UAE", Popular: false },
    { name: "Midea", country: "Global", Popular: false },
    { name: "SKM Air Conditioning", country: "UAE", Popular: false },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-sky-600" /> Multi-Brand HVAC Specialists
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              We Repair & Service All Major AC Brands in Dubai
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Equipped with genuine factory spare parts, diagnostic tools, and certified technicians for every brand.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 shrink-0">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-xs font-extrabold text-slate-900">100% Genuine OEM Spare Parts</p>
              <p className="text-[11px] text-slate-500">Compressors, Capacitors, PCBs & Motors</p>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="bg-slate-50 hover:bg-sky-50/80 border border-slate-200/90 hover:border-sky-300 rounded-2xl p-3.5 text-center transition-all duration-200 group flex flex-col items-center justify-center min-h-[84px] shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Wrench className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                <span className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-sky-900 transition-colors">
                  {brand.name}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 group-hover:text-sky-700">
                {brand.Popular ? "⭐ Factory Parts" : "Certified Service"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

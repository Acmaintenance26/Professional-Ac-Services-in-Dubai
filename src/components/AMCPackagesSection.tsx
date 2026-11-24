import React from "react";
import { ShieldCheck, Check, Sparkles, PhoneCall, Star, Zap } from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";

interface AMCPackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const AMCPackagesSection: React.FC<AMCPackagesSectionProps> = ({ onSelectPackage }) => {
  const PACKAGES = [
    {
      id: "silver",
      name: "Silver Maintenance Plan",
      subtitle: "Ideal for 1-2 Bedroom Apartments",
      price: "AED 799",
      period: "/ Year",
      popular: false,
      badge: "Standard",
      features: [
        "2 Comprehensive AC Jet Wash Services / Year",
        "2 Free Emergency Breakdown Visits",
        "Free Air Filter Cleaning & Sanitization",
        "Drain Tray Unclogging & Flushing",
        "Thermostat Calibration & Sensor Check",
        "10% Discount on Spare Parts Replacement",
      ],
      ctaText: "Choose Silver Plan",
    },
    {
      id: "gold",
      name: "Gold Maintenance Plan",
      subtitle: "Most Popular for Apartments & Townhouses",
      price: "AED 1,299",
      period: "/ Year",
      popular: true,
      badge: "Best Value",
      features: [
        "3 Quarterly Chemical Jet Wash Services / Year",
        "UNLIMITED Free Emergency Breakdown Calls (24/7)",
        "Free Gas Leak Inspection & Minor Top-Up",
        "Anti-Bacterial Coil Sanitization",
        "Electrical Wiring & Capacitor Testing",
        "15% Discount on Spare Parts Replacement",
        "Priority Technician Arrival within 30 Mins",
      ],
      ctaText: "Get Gold Plan",
    },
    {
      id: "platinum",
      name: "Platinum VIP Villa Plan",
      subtitle: "Complete Peace of Mind for Luxury Villas",
      price: "AED 1,999",
      period: "/ Year",
      popular: false,
      badge: "VIP Luxury",
      features: [
        "4 Quarterly Deep Chemical & Coil Services / Year",
        "UNLIMITED 24/7 Priority Emergency Breakdown Visits",
        "FREE Annual AC Duct Sanitization & Fogging",
        "FREE Refrigerant Gas Top-Up (R410A / R22)",
        "FREE Capacitor & Minor Sensor Replacements",
        "Dedicated Senior HVAC Engineer Assigned",
        "20% Discount on Major Spare Parts",
      ],
      ctaText: "Subscribe Platinum Plan",
    },
  ];

  return (
    <section id="amc-packages" className="py-16 lg:py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Year-Round Cooling Insurance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Annual AC Maintenance Contracts (AMC) in Dubai
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Avoid costly unexpected AC breakdowns and reduce your DEWA electricity bills up to 25% with our hassle-free yearly maintenance plans for apartments, villas, and offices.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                pkg.popular
                  ? "bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 text-white shadow-2xl border-2 border-sky-400 transform lg:-translate-y-2"
                  : "bg-slate-50 hover:bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-xl"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-white" /> Most Popular in Dubai
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      pkg.popular ? "bg-sky-500/30 text-sky-300" : "bg-slate-200 text-slate-700"
                    }`}>
                      {pkg.badge}
                    </span>
                    <h3 className={`text-xl font-extrabold mt-2 ${pkg.popular ? "text-white" : "text-slate-900"}`}>
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                <p className={`text-xs mb-6 ${pkg.popular ? "text-slate-300" : "text-slate-500"}`}>
                  {pkg.subtitle}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-200/40 flex items-baseline gap-1">
                  <span className={`text-3xl sm:text-4xl font-black ${pkg.popular ? "text-amber-400" : "text-sky-700"}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-xs font-semibold ${pkg.popular ? "text-slate-300" : "text-slate-500"}`}>
                    {pkg.period}
                  </span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed">
                      <div className={`p-1 rounded-full shrink-0 mt-0.5 ${
                        pkg.popular ? "bg-emerald-500/20 text-emerald-400" : "bg-sky-100 text-sky-700"
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={pkg.popular ? "text-slate-200" : "text-slate-700 font-medium"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPackage(pkg.name)}
                className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/30"
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{pkg.ctaText}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Custom Commercial Quote Bar */}
        <div className="mt-12 bg-sky-50 rounded-2xl p-6 border border-sky-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Need Custom AMC Contract for Office Towers, Hotels or Schools?</h4>
              <p className="text-xs text-slate-600">We offer custom commercial HVAC maintenance agreements tailored to building specifications.</p>
            </div>
          </div>
          <a
            href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shrink-0 transition-colors"
          >
            Request Commercial Quote
          </a>
        </div>

      </div>
    </section>
  );
};

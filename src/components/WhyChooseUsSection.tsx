import React from "react";
import { 
  Zap, 
  Award, 
  DollarSign, 
  ShieldAlert, 
  PhoneCall, 
  Building, 
  CheckCircle, 
  ThumbsUp,
  ShieldCheck,
  Clock,
  Sparkles,
  X,
  Check
} from "lucide-react";
import { FEATURES_DATA } from "../data/hvacData";

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-6 h-6 text-sky-600" />;
      case "Award": return <Award className="w-6 h-6 text-sky-600" />;
      case "DollarSign": return <DollarSign className="w-6 h-6 text-sky-600" />;
      case "ShieldAlert": return <ShieldAlert className="w-6 h-6 text-sky-600" />;
      case "PhoneCall": return <PhoneCall className="w-6 h-6 text-sky-600" />;
      case "Building": return <Building className="w-6 h-6 text-sky-600" />;
      case "CheckCircle": return <CheckCircle className="w-6 h-6 text-sky-600" />;
      case "ThumbsUp": return <ThumbsUp className="w-6 h-6 text-sky-600" />;
      default: return <ShieldCheck className="w-6 h-6 text-sky-600" />;
    }
  };

  const COMPARISON_ROWS = [
    { feature: "Licensed & Insured HVAC Company", us: true, others: false },
    { feature: "30 to 90 Day Workmanship Warranty", us: true, others: false },
    { feature: "30-Minute Rapid Emergency Response", us: true, others: false },
    { feature: "100% Genuine OEM Factory Spare Parts", us: true, others: false },
    { feature: "High-Pressure Chemical Jet Coil Wash", us: true, others: false },
    { feature: "Fixed Upfront Quotes (Zero Hidden Fees)", us: true, others: false },
    { feature: "24/7 Phone & WhatsApp Live Support", us: true, others: false },
  ];

  return (
    <section id="why-choose-us" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Why Homeowners Trust Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose AC Maintenance Dubai?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are dedicated to keeping your home and workspace cool during Dubai's intense summers. Here is why thousands of residents and business owners choose us as their primary HVAC contractor.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-sky-600 border border-slate-200 group-hover:border-sky-600 flex items-center justify-center mb-5 transition-colors shadow-xs">
                <div className="group-hover:text-white transition-colors">
                  {getIcon(feature.iconName)}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                ✔ {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="mt-16 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase text-sky-700 tracking-wider">Competitor Comparison</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">How We Compare to Unlicensed Local Freelancers</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 font-bold text-slate-800">Feature / Standard</th>
                  <th className="py-4 px-4 font-black text-sky-700 bg-sky-100/80 rounded-t-2xl text-center w-1/3">
                    AC Maintenance Dubai (Us)
                  </th>
                  <th className="py-4 px-4 font-bold text-slate-500 text-center w-1/3">
                    Unlicensed Local Freelancers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center bg-sky-50/50">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold bg-emerald-100/80 px-2.5 py-1 rounded-full text-xs">
                        <Check className="w-3.5 h-3.5" /> Guaranteed
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-rose-500 font-bold bg-rose-50 px-2.5 py-1 rounded-full text-xs">
                        <X className="w-3.5 h-3.5" /> No Warranty / Risk
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Highlight Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-sky-800/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-sky-400">15,000+</p>
              <p className="text-xs text-slate-300 font-medium uppercase mt-1">AC Units Serviced</p>
            </div>
            <div className="p-2 pt-6 lg:pt-2">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">30 Mins</p>
              <p className="text-xs text-slate-300 font-medium uppercase mt-1">Avg Response Time</p>
            </div>
            <div className="p-2 pt-6 lg:pt-2">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-300 font-medium uppercase mt-1">Transparent Quotes</p>
            </div>
            <div className="p-2 pt-6 lg:pt-2">
              <p className="text-3xl sm:text-4xl font-black text-orange-400">24/7</p>
              <p className="text-xs text-slate-300 font-medium uppercase mt-1">Emergency Service</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


import React, { useState } from "react";
import { Calculator, Sparkles, Check, ArrowRight, ShieldCheck, Zap, MessageSquare } from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";

interface PriceCalculatorProps {
  onBookWithEstimate: (details: { service: string; price: number; units: number; type: string }) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onBookWithEstimate }) => {
  const [acType, setAcType] = useState<string>("split");
  const [unitCount, setUnitCount] = useState<number>(1);
  const [serviceType, setServiceType] = useState<string>("jet-wash");

  const servicePrices: Record<string, Record<string, number>> = {
    "split": {
      "basic": 120,
      "jet-wash": 150,
      "gas-refill": 160,
      "leak-fix": 150,
      "duct-clean": 350,
    },
    "central": {
      "basic": 180,
      "jet-wash": 250,
      "gas-refill": 220,
      "leak-fix": 200,
      "duct-clean": 450,
    },
    "package": {
      "basic": 250,
      "jet-wash": 350,
      "gas-refill": 300,
      "leak-fix": 280,
      "duct-clean": 600,
    },
  };

  const serviceNames: Record<string, string> = {
    "basic": "Filter & Standard Servicing",
    "jet-wash": "High-Pressure Chemical Jet Wash",
    "gas-refill": "Refrigerant Gas Top-Up (R410A / R22)",
    "leak-fix": "Water Leak Fixing & Drain Clearing",
    "duct-clean": "Deep Duct Sanitization & Fogging",
  };

  const acTypeLabels: Record<string, string> = {
    "split": "Wall-Mounted Split AC",
    "central": "Ducted Central AC / FCU",
    "package": "Package / Commercial Chiller",
  };

  const basePrice = servicePrices[acType]?.[serviceType] || 150;
  // Apply discount for multi-unit servicing
  const discountMultiplier = unitCount >= 4 ? 0.8 : unitCount >= 2 ? 0.9 : 1.0;
  const totalPrice = Math.round(basePrice * unitCount * discountMultiplier);

  const handleBookEstimate = () => {
    onBookWithEstimate({
      service: serviceNames[serviceType],
      price: totalPrice,
      units: unitCount,
      type: acTypeLabels[acType],
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I calculated an estimated quote on your website:\n- AC Type: ${acTypeLabels[acType]}\n- Quantity: ${unitCount} Unit(s)\n- Service: ${serviceNames[serviceType]}\n- Total Estimated Price: AED ${totalPrice}\nPlease confirm technician availability in Dubai.`
  );

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-sky-50/60 via-white to-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-sky-600" /> Transparent Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Instant AC Service Cost Estimator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your AC type, service requirements, and unit count to calculate your transparent upfront quote in AED. Zero hidden charges.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Form Inputs */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Step 1: AC Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select AC System Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "split", label: "Split AC" },
                  { id: "central", label: "Central AC" },
                  { id: "package", label: "Package / Villa" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setAcType(type.id)}
                    className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all ${
                      acType === type.id
                        ? "bg-sky-600 text-white border-sky-600 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Service Required */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Select Required Service
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="basic">Filter Wash & General Servicing</option>
                <option value="jet-wash">High-Pressure Chemical Jet Wash (Recommended)</option>
                <option value="gas-refill">AC Gas Refill (R410A / R22 / R32)</option>
                <option value="leak-fix">Water Leak Repair & Drain Flushing</option>
                <option value="duct-clean">Deep Duct Sanitization & Antibacterial Fogging</option>
              </select>
            </div>

            {/* Step 3: Quantity */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Number of AC Units
                </label>
                <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  {unitCount} {unitCount === 1 ? "Unit" : "Units"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setUnitCount(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black border transition-all ${
                      unitCount === num
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {num} {num === 5 ? "+" : ""}
                  </button>
                ))}
              </div>
              {unitCount >= 2 && (
                <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Multi-unit discount applied ({unitCount >= 4 ? "20% OFF" : "10% OFF"})!
                </p>
              )}
            </div>

          </div>

          {/* Result Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-2xl p-6 border border-sky-800/50 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-sky-300 font-bold uppercase tracking-wider">Estimated Total</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  No Hidden Fees
                </span>
              </div>

              <div className="my-4">
                <div className="text-4xl font-black text-amber-400 tracking-tight">
                  AED {totalPrice}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  For {unitCount}x {acTypeLabels[acType]} ({serviceNames[serviceType]})
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Includes free diagnostic inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Workmanship Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Technician arrival in 30 mins across Dubai</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleBookEstimate}
                className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Book This Estimated Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Instant Quote on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

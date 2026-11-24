import React, { useState } from "react";
import { 
  Wrench, 
  Settings, 
  Zap, 
  Hammer, 
  Wind, 
  ShieldCheck, 
  Building2, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
  PhoneCall,
  Check
} from "lucide-react";
import { SERVICES_DATA, COMPANY_DETAILS } from "../data/hvacData";
import { ServiceItem } from "../types";
import { AudioAssistant } from "./AudioAssistant";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Wrench": return <Wrench className="w-6 h-6 text-sky-600" />;
      case "Settings": return <Settings className="w-6 h-6 text-sky-600" />;
      case "Zap": return <Zap className="w-6 h-6 text-sky-600" />;
      case "Hammer": return <Hammer className="w-6 h-6 text-sky-600" />;
      case "Wind": return <Wind className="w-6 h-6 text-sky-600" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-sky-600" />;
      case "Building2": return <Building2 className="w-6 h-6 text-sky-600" />;
      case "Clock": return <Clock className="w-6 h-6 text-orange-500" />;
      default: return <CheckCircle2 className="w-6 h-6 text-sky-600" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter(service => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Popular") return service.popular;
    if (activeFilter === "Emergency") return service.id.includes("emergency");
    if (activeFilter === "Cleaning") return service.id.includes("duct") || service.id.includes("split");
    return true;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Professional HVAC Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Expert AC Maintenance & Repair Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From emergency repairs to deep duct sanitization and gas refills, we provide complete air conditioning solutions for residential villas, apartments, and commercial buildings in Dubai.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {["All", "Popular", "Emergency", "Cleaning"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {filter === "All" ? "All Services" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                  Popular
                </div>
              )}

              <div>
                {/* Service Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-sky-600 border border-sky-100 group-hover:border-sky-600 flex items-center justify-center mb-5 transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Starting Price Badge */}
                <div className="flex items-center justify-between text-xs font-bold py-2 border-t border-slate-100 mb-4">
                  <span className="text-slate-500">Starting From:</span>
                  <span className="text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                    {service.startingPrice}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-sky-300 bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-sky-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Learn More & Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                </button>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Book This Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Drawer for Service Details */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative border border-slate-100">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-100 rounded-xl text-sky-700">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Detailed Service Specs
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            {/* Audio Voice Overview */}
            <div className="mb-6">
              <AudioAssistant 
                variant="card"
                textToSpeak={selectedService.audioText}
                buttonLabel={`Listen to ${selectedService.title} Audio Summary`}
              />
            </div>

            {/* Included Features */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                What's Included In This Service:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-2xl mb-6">
              <div>
                <span className="text-xs font-bold text-orange-800">Estimated Price:</span>
                <p className="text-lg font-black text-orange-900">{selectedService.startingPrice}</p>
              </div>
              <span className="text-xs text-orange-700 font-medium">
                *Final quote provided after on-site check
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectService(serviceName);
                }}
                className="w-full sm:flex-1 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/25 text-sm text-center"
              >
                Book Appointment Now
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Call Hotline</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

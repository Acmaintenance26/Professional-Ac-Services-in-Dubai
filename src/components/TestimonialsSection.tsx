import React, { useState } from "react";
import { Star, Quote, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data/hvacData";

export const TestimonialsSection: React.FC = () => {
  const [filterService, setFilterService] = useState("All");

  const filterOptions = ["All", "Emergency AC Repair", "AC Duct Cleaning", "AC Gas Refill", "Central AC Maintenance"];

  const filteredTestimonials = TESTIMONIALS_DATA.filter((t) => {
    if (filterService === "All") return true;
    return t.serviceUsed === filterService;
  });

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Real Verified Dubai Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Read authentic reviews from Dubai villa owners, apartment residents, and commercial building managers who depend on our 24/7 AC maintenance team.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterService(opt)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterService === opt
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sky-100 group-hover:text-sky-200 transition-colors" />
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{review.name}</span>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 inline" title="Verified Customer" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{review.location}</span>
                    </p>
                  </div>

                  <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-1 rounded-md">
                    {review.serviceUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

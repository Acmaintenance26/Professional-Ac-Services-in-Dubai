import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle, Sparkles } from "lucide-react";
import { FAQ_DATA } from "../data/hvacData";
import { AudioAssistant } from "./AudioAssistant";

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Pricing", "Services", "Emergency", "General"];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? "" : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Got Questions? We Have Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our AC maintenance, gas refill, repair rates, and same-day HVAC service across Dubai.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-6" />
            <input
              type="text"
              placeholder="Search AC questions (e.g., cost, same-day, gas refill)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No matching questions found. Try searching for "cost", "duct", or "emergency".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "bg-sky-50/50 border-sky-300 shadow-md" 
                      : "bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base gap-4"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-sky-600" : "text-slate-400"}`} />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-sky-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-sky-200/50 space-y-3">
                      <p>{faq.answer}</p>
                      
                      <div className="pt-2">
                        <AudioAssistant 
                          variant="compact"
                          textToSpeak={`${faq.question}. Answer: ${faq.answer}`}
                          buttonLabel="Listen to Answer with AI Voice"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Wind,
  CalendarCheck
} from "lucide-react";
import { COMPANY_DETAILS } from "../data/hvacData";
import { Logo } from "./Logo";

interface HeaderProps {
  onOpenBooking: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenBooking, 
  currentPage, 
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Services", page: "services" },
    { name: "About Us", page: "about" },
    { name: "Blog", page: "blog" },
    { name: "Contact Us", page: "contact" },
  ];

  const handleNavClick = (page: string) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar - Hidden on mobile, visible on desktop */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Deira, Dubai, UAE</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>24/7 Emergency AC Service Available</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Licensed HVAC Contractors</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href={`tel:${COMPANY_DETAILS.phoneFormatted}`} 
              className="flex items-center gap-1.5 font-medium text-sky-300 hover:text-sky-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=Hi,%20I%20need%20AC%20service%20in%20Dubai`}
              target="_blank"
              rel="noreferrer" 
              className="flex items-center gap-1.5 font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${
          isScrolled ? "shadow-md py-3" : "py-4"
        } border-slate-100`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick("home")}
            className="text-left"
          >
            <Logo variant="dark" size="md" showTagline={true} />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3.5 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all ${
                    isActive 
                      ? "text-sky-600 bg-sky-50 shadow-2xs" 
                      : "text-slate-700 hover:text-sky-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 font-bold text-xs transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>Call Now</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-orange-500/25 hover:shadow-lg transition-all transform active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
              className="p-2.5 rounded-lg bg-sky-100 text-sky-700"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-5 animate-in slide-in-from-top duration-200">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl text-left transition-colors ${
                  currentPage === link.page
                    ? "bg-sky-50 text-sky-600 font-bold"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-md text-sm text-center flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${COMPANY_DETAILS.phoneFormatted}`}
                className="py-2.5 bg-sky-50 text-sky-700 border border-sky-200 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=Hi,%20I%20need%20AC%20maintenance%20in%20Dubai`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

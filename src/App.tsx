import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { BrandsShowcase } from "./components/BrandsShowcase";
import { ServicesSection } from "./components/ServicesSection";
import { PriceCalculator } from "./components/PriceCalculator";
import { AMCPackagesSection } from "./components/AMCPackagesSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { AboutSection } from "./components/AboutSection";
import { BookingSection } from "./components/BookingSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { BlogSection } from "./components/BlogSection";
import { ServiceAreasSection } from "./components/ServiceAreasSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingCTAs } from "./components/FloatingCTAs";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "services" | "about" | "blog" | "contact">("home");
  const [selectedBookingService, setSelectedBookingService] = useState("AC Maintenance Dubai");

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedBookingService(serviceName);
    }
    // Switch to home or services page if not on one that has booking
    if (currentPage !== "home" && currentPage !== "services") {
      setCurrentPage("home");
    }
    setTimeout(() => {
      const el = document.getElementById("book-appointment");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      {/* Sticky Header */}
      <Header
        onOpenBooking={() => scrollToBooking()}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === "home" && (
          <>
            {/* Hero Section */}
            <HeroSection onOpenBooking={(srv) => scrollToBooking(srv)} />

            {/* Brands We Service Banner */}
            <BrandsShowcase />

            {/* Featured Services Section */}
            <ServicesSection onSelectService={(srv) => scrollToBooking(srv)} />

            {/* Price Estimator Calculator */}
            <PriceCalculator
              onBookWithEstimate={({ service, price, units, type }) => {
                scrollToBooking(`${service} (${units}x ${type} - Est. AED ${price})`);
              }}
            />

            {/* AMC Packages Section */}
            <AMCPackagesSection onSelectPackage={(pkg) => scrollToBooking(`AMC - ${pkg}`)} />

            {/* Why Choose Us & Comparison Section */}
            <WhyChooseUsSection />

            {/* Interactive Booking Section */}
            <BookingSection initialService={selectedBookingService} />

            {/* Customer Testimonials */}
            <TestimonialsSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Coverage Areas */}
            <ServiceAreasSection />
          </>
        )}

        {currentPage === "services" && (
          <div>
            {/* Subpage Breadcrumb Banner */}
            <div className="bg-gradient-to-r from-sky-100/90 via-sky-50 to-slate-50 text-slate-900 py-12 border-b border-sky-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs text-sky-700 font-bold mb-2">
                  <button onClick={() => handleNavigate("home")} className="hover:underline">Home</button>
                  <span>/</span>
                  <span className="text-slate-800 font-bold">Our Services</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">AC Services in Dubai</h1>
                <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                  Comprehensive HVAC solutions from 24/7 emergency AC repair and gas refills to deep duct cleaning and annual maintenance contracts (AMC).
                </p>
              </div>
            </div>

            {/* Brands We Service Banner */}
            <BrandsShowcase />

            {/* Full Services Catalog */}
            <ServicesSection onSelectService={(srv) => scrollToBooking(srv)} />

            {/* Price Estimator Calculator */}
            <PriceCalculator
              onBookWithEstimate={({ service, price, units, type }) => {
                scrollToBooking(`${service} (${units}x ${type} - Est. AED ${price})`);
              }}
            />

            {/* AMC Packages Section */}
            <AMCPackagesSection onSelectPackage={(pkg) => scrollToBooking(`AMC - ${pkg}`)} />

            {/* Booking Form */}
            <BookingSection initialService={selectedBookingService} />

            {/* FAQ */}
            <FAQSection />
          </div>
        )}

        {currentPage === "about" && (
          <div>
            {/* Subpage Breadcrumb Banner */}
            <div className="bg-gradient-to-r from-sky-100/90 via-sky-50 to-slate-50 text-slate-900 py-12 border-b border-sky-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs text-sky-700 font-bold mb-2">
                  <button onClick={() => handleNavigate("home")} className="hover:underline">Home</button>
                  <span>/</span>
                  <span className="text-slate-800 font-bold">About Us</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">About AC Maintenance Dubai</h1>
                <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                  Licensed HVAC contractors dedicated to keeping Dubai homes, villas, and offices cool, healthy, and energy-efficient.
                </p>
              </div>
            </div>

            {/* Standalone About Section */}
            <AboutSection />

            {/* Why Choose Us & Guarantees */}
            <WhyChooseUsSection />

            {/* Customer Testimonials */}
            <TestimonialsSection />
          </div>
        )}

        {currentPage === "blog" && (
          <div>
            {/* Subpage Breadcrumb Banner */}
            <div className="bg-gradient-to-r from-sky-100/90 via-sky-50 to-slate-50 text-slate-900 py-12 border-b border-sky-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs text-sky-700 font-bold mb-2">
                  <button onClick={() => handleNavigate("home")} className="hover:underline">Home</button>
                  <span>/</span>
                  <span className="text-slate-800 font-bold">HVAC Blog & Journal</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Dubai AC & Energy Saving Blog</h1>
                <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                  Expert advice on lowering your DEWA bill, fixing AC leaks, cleaning air ducts, and choosing the best cooling system for Dubai weather.
                </p>
              </div>
            </div>

            {/* Standalone Blog Page */}
            <BlogSection onOpenBooking={(srv) => scrollToBooking(srv)} />
          </div>
        )}

        {currentPage === "contact" && (
          <div>
            {/* Subpage Breadcrumb Banner */}
            <div className="bg-gradient-to-r from-sky-100/90 via-sky-50 to-slate-50 text-slate-900 py-12 border-b border-sky-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs text-sky-700 font-bold mb-2">
                  <button onClick={() => handleNavigate("home")} className="hover:underline">Home</button>
                  <span>/</span>
                  <span className="text-slate-800 font-bold">Contact Us</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Contact AC Maintenance Dubai</h1>
                <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                  Have an AC emergency or need a quick quotation? Call us 24/7 or send us a message directly.
                </p>
              </div>
            </div>

            {/* Contact Details & Map */}
            <ContactSection />

            {/* Coverage Areas */}
            <ServiceAreasSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={(srv) => scrollToBooking(srv)} 
        onNavigate={handleNavigate}
      />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingCTAs />
    </div>
  );
}

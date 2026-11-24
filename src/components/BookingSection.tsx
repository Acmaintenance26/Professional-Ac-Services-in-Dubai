import React, { useState } from "react";
import { 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Loader2,
  Send
} from "lucide-react";
import { BookingFormData } from "../types";
import { COMPANY_DETAILS, SERVICES_DATA } from "../data/hvacData";

interface BookingSectionProps {
  initialService?: string;
  onSuccess?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ 
  initialService = "AC Maintenance Dubai" 
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    email: "",
    serviceRequired: initialService,
    location: "Deira",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "Morning (8 AM - 12 PM)",
    message: "",
  });

  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.serviceRequired || !formData.location) {
      setError("Please fill in all mandatory fields (Name, Phone, Service, Location).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      setBookingResponse({
        referenceId: data.referenceId,
        message: data.message,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hi AC Maintenance Dubai!%0A%0A*Booking Reference:* ${bookingResponse?.referenceId}%0A*Name:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.serviceRequired}%0A*Location:* ${formData.location}%0A*Date:* ${formData.preferredDate}%0A*Message:* ${formData.message || 'N/A'}`;
    return `https://wa.me/${COMPANY_DETAILS.whatsappFormatted}?text=${text}`;
  };

  return (
    <section id="book-appointment" className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Fast Online Scheduling
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book Your AC Service Appointment
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill out the form below to schedule a same-day AC inspection, repair, or maintenance visit anywhere in Dubai. Our team will contact you within 15 minutes!
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100">
          
          {bookingResponse ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Booking Confirmed #{bookingResponse.referenceId}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-slate-600 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
                  {bookingResponse.message}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 text-left max-w-md mx-auto space-y-1.5">
                <p><strong>Service:</strong> {formData.serviceRequired}</p>
                <p><strong>Location:</strong> {formData.location}</p>
                <p><strong>Date:</strong> {formData.preferredDate} ({formData.preferredTime})</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setBookingResponse(null);
                    setFormData({
                      fullName: "",
                      phone: "",
                      email: "",
                      serviceRequired: "AC Maintenance Dubai",
                      location: "Deira",
                      preferredDate: new Date().toISOString().split("T")[0],
                      preferredTime: "Morning (8 AM - 12 PM)",
                      message: "",
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="booking-website">Website</label>
                <input
                  id="booking-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Tariq Al-Mansoori"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number (UAE) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>

                {/* Service Required */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Service Required <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Wrench className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Location in Dubai <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    >
                      <option value="Deira">Deira</option>
                      <option value="Bur Dubai">Bur Dubai</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Business Bay">Business Bay</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Jumeirah Lakes Towers (JLT)">JLT</option>
                      <option value="Palm Jumeirah">Palm Jumeirah</option>
                      <option value="Jumeirah Village Circle (JVC)">JVC</option>
                      <option value="Mirdif">Mirdif</option>
                      <option value="Al Barsha">Al Barsha</option>
                      <option value="Silicon Oasis">Silicon Oasis</option>
                      <option value="Dubai Hills Estate">Dubai Hills</option>
                      <option value="Arabian Ranches">Arabian Ranches</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    >
                      <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      <option value="Urgent Immediate Callout">Urgent Immediate Callout</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Message / Issue Description
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Describe your AC problem (e.g., leaking water, no cooling, strange noise, or regular service)"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Appointment...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Book Appointment Now</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Free Cancellation
                </span>
                <span>Or call hotline: <a href={`tel:${COMPANY_DETAILS.phoneFormatted}`} className="font-bold text-slate-800 hover:text-sky-600">{COMPANY_DETAILS.phone}</a></span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

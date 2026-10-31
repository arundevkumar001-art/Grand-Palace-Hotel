import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column (span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
                <span>Reach Us</span>
                <span aria-hidden="true">·</span>
                <span>24/7 Hospitality Desk</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight mb-4 text-balance">
                We Are Here to Assist Your Stay
              </h2>
              <p className="text-stone-600 text-base leading-relaxed mb-8">
                Have questions regarding suite reservations, private banquets, corporate meetings, or airport transfers? Our concierge team is available 24/7.
              </p>

              {/* Direct Info Tiles */}
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-stone-200 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                      Address & Location
                    </span>
                    <span className="text-stone-900 font-medium text-sm block mt-0.5">
                      {HOTEL_INFO.address}
                    </span>
                    <span className="text-stone-500 text-xs">
                      Connaught Place, New Delhi 110001
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-stone-200 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${HOTEL_INFO.phone}`}
                      className="text-stone-900 font-semibold text-sm block mt-0.5 hover:text-amber-600 tabular-nums transition-colors"
                    >
                      {HOTEL_INFO.phone}
                    </a>
                    <span className="text-stone-500 text-xs">
                      Direct 24/7 Front Desk Line
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-stone-200 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${HOTEL_INFO.email}`}
                      className="text-stone-900 font-medium text-sm block mt-0.5 hover:text-amber-600 transition-colors"
                    >
                      {HOTEL_INFO.email}
                    </a>
                    <span className="text-stone-500 text-xs">
                      General & Reservation Inquiries
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-stone-200 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                      Operating Hours
                    </span>
                    <span className="text-stone-900 font-medium text-sm block mt-0.5">
                      Open 24 Hours / 7 Days a Week
                    </span>
                    <span className="text-stone-500 text-xs tabular-nums">
                      Check-in: {HOTEL_INFO.checkIn} · Check-out: {HOTEL_INFO.checkOut}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form column (span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs">
              <h3 className="font-serif text-2xl font-normal text-stone-900 mb-2">
                Send a Message to Concierge
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Fill in the details below and our team will get back to you within 30 minutes.
              </p>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-stone-900 font-medium mb-2">
                    Inquiry Received, {formData.name}
                  </h4>
                  <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                    Thank you for contacting Grand Palace Hotel. Our concierge has received your request regarding "{formData.subject}" and will respond to {formData.email} promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Inquiry',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider uppercase rounded transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Roy"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Room Reservations">Room Reservations</option>
                        <option value="Banquets & Conferences">Banquets & Conferences</option>
                        <option value="Dining & Table Booking">Dining & Table Booking</option>
                        <option value="Airport Chauffeur Transfer">Airport Chauffeur Transfer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share your dates, requirements, or special preferences..."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Front Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

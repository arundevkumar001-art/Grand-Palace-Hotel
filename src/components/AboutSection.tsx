import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Clock, MapPin, Phone, Mail, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
            <span>About Grand Palace</span>
            <span aria-hidden="true">·</span>
            <span>Est. New Delhi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight mb-5 text-balance">
            Where Royal Heritage Meets Contemporary Comfort
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            {HOTEL_INFO.about}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-white rounded-lg border border-stone-200/90 shadow-xs hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
              Unrivaled Luxury
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              From our Italian marble colonnades to custom Egyptian cotton bedding, every touchpoint has been curated to indulge your senses.
            </p>
          </div>

          <div className="p-8 bg-white rounded-lg border border-stone-200/90 shadow-xs hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
              Effortless Comfort
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Quiet-zone soundproofing, whisper-soft climate management, and high-speed fiber connectivity allow you to truly unwind and feel at home.
            </p>
          </div>

          <div className="p-8 bg-white rounded-lg border border-stone-200/90 shadow-xs hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
              Warm Indian Hospitality
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Embodying the timeless tradition of <em>Atithi Devo Bhava</em>, our 24/7 concierge and personalized butler team cater attentively to every requirement.
            </p>
          </div>
        </div>

        {/* Basic Information Dossier */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                Official Hotel Dossier
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1">
                Grand Palace Hotel Information
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 border border-stone-700 rounded text-xs text-amber-400 font-medium">
                <Award className="w-4 h-4 text-amber-400" />
                5-Star Verified Landmark
              </span>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-100">
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Location & Address</span>
                </div>
                <div className="text-stone-900 font-semibold text-base">
                  {HOTEL_INFO.address}
                </div>
                <div className="text-stone-500 text-xs mt-1">
                  {HOTEL_INFO.location}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>Direct Telephone</span>
                </div>
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="text-stone-900 font-semibold text-base hover:text-amber-600 transition-colors tabular-nums"
                >
                  {HOTEL_INFO.phone}
                </a>
                <div className="text-stone-500 text-xs mt-1">
                  Available 24 hours a day
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Email Inquiries</span>
                </div>
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="text-stone-900 font-semibold text-base hover:text-amber-600 transition-colors"
                >
                  {HOTEL_INFO.email}
                </a>
                <div className="text-stone-500 text-xs mt-1">
                  Concierge & Reservations
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Check-in / Check-out</span>
                </div>
                <div className="text-stone-900 font-semibold text-base tabular-nums">
                  In: {HOTEL_INFO.checkIn} · Out: {HOTEL_INFO.checkOut}
                </div>
                <div className="text-stone-500 text-xs mt-1">
                  Front Desk Open 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

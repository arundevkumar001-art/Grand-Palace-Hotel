import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ChevronRight, Star, MapPin } from 'lucide-react';
import { HOTEL_INFO, ROOMS } from '../data/hotelData';

interface HeroProps {
  onOpenBooking: (prefill?: { roomId?: string; checkIn?: string; checkOut?: string; guests?: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  // Default dates: tomorrow and day after
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [selectedRoomId, setSelectedRoomId] = useState('deluxe-room');
  const [guests, setGuests] = useState(2);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      roomId: selectedRoomId,
      checkIn,
      checkOut,
      guests
    });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-stone-950">
      {/* Background Image with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_grand_palace_1793432167108.jpg"
          alt="Grand Palace Hotel exterior at twilight in Connaught Place New Delhi"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-900/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-3xl">
          {/* Unboxed editorial kicker */}
          <div className="flex items-center gap-2.5 text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>{HOTEL_INFO.classification}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="flex items-center gap-1 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Connaught Place, New Delhi
            </span>
          </div>

          {/* Primary Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.1] mb-6 text-balance">
            {HOTEL_INFO.heading}
          </h1>

          {/* Subheading & Tagline */}
          <p className="text-stone-200 text-lg sm:text-xl font-light leading-relaxed mb-4 max-w-2xl">
            {HOTEL_INFO.tagline}
          </p>
          <p className="text-stone-300/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
            {HOTEL_INFO.subheading} Immerse yourself in Connaught Place's most distinguished heritage landmark, featuring curated fine dining, tranquil pools, and bespoke luxury suites.
          </p>

          {/* Quick CTA cluster */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-7 py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase rounded shadow-lg transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Explore & Book Rooms</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#rooms"
              className="px-6 py-3.5 border border-white/30 hover:border-white text-stone-200 hover:text-white font-medium text-xs tracking-wider uppercase rounded transition-colors"
            >
              View Room Collection
            </a>
          </div>
        </div>
      </div>

      {/* Floating Booking Reservation Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <form
          onSubmit={handleBookingSubmit}
          className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border border-stone-200/80 p-4 sm:p-5 lg:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Check-in */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Check-in Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-amber-600 pointer-events-none" />
                <input
                  type="date"
                  value={checkIn}
                  min={formatDate(today)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  required
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Check-out Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-amber-600 pointer-events-none" />
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || formatDate(today)}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  required
                />
              </div>
            </div>

            {/* Room selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Room Category
              </label>
              <div className="relative flex items-center">
                <BedDouble className="absolute left-3 w-4 h-4 text-amber-600 pointer-events-none" />
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium appearance-none"
                >
                  {ROOMS.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} (₹{room.price.toLocaleString('en-IN')}/nt)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">
                Guests
              </label>
              <div className="relative flex items-center">
                <Users className="absolute left-3 w-4 h-4 text-amber-600 pointer-events-none" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium appearance-none"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults / Family</option>
                </select>
              </div>
            </div>

            {/* Action button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-all flex items-center justify-center gap-1.5"
              >
                <span>Check Rates & Book</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

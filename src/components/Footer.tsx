import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, Mail, MapPin, Clock, Star, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-stone-950 text-white pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800">
          {/* Brand info (span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-amber-500/70 flex items-center justify-center bg-amber-500/10">
                <span className="font-serif text-amber-500 font-bold text-base">G</span>
              </div>
              <span className="font-serif text-2xl tracking-wider font-semibold uppercase text-white">
                {HOTEL_INFO.name}
              </span>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Connaught Place, New Delhi's prestigious 5-star heritage sanctuary. Experience world-class hospitality, gourmet royal dining, and serene residential comfort.
            </p>

            <div className="flex items-center gap-1.5 text-amber-400 text-xs pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-stone-400 ml-1">5-Star Luxury Accreditation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Suites</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">Hotel Facilities</a></li>
              <li><a href="#restaurant" className="hover:text-white transition-colors">Restaurant & Menu</a></li>
              <li><a href="#offers" className="hover:text-white transition-colors">Special Offers</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
            </ul>
          </div>

          {/* Room Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Accommodations
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><span className="text-white font-medium">Standard Room</span> <span className="text-stone-500 block">₹2,500/night</span></li>
              <li><span className="text-white font-medium">Deluxe Room</span> <span className="text-stone-500 block">₹4,000/night (Free Breakfast)</span></li>
              <li><span className="text-white font-medium">Luxury Suite</span> <span className="text-stone-500 block">₹7,500/night</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white tabular-nums">
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Check-in: 12:00 PM · Check-out: 11:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved. Connaught Place, New Delhi, India.
          </div>
          <div className="flex items-center gap-6">
            <span>24/7 Front Desk & Concierge</span>
            <span>·</span>
            <span>Taxes & Luxury Hospitality Code Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

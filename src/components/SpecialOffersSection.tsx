import React from 'react';
import { SPECIAL_OFFERS, SpecialOffer } from '../data/hotelData';
import { Tag, Sparkles, Coffee, CalendarCheck, Clock, ArrowRight } from 'lucide-react';

interface SpecialOffersSectionProps {
  onApplyOffer: (offerCode: string, targetRoomId?: string) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({ onApplyOffer }) => {
  return (
    <section id="offers" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <span>Exclusive Privileges</span>
            <span aria-hidden="true">·</span>
            <span>Limited Availability</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-balance text-white">
            Special Stays & Privileged Offers
          </h2>
          <p className="text-stone-300 text-base mt-4 leading-relaxed">
            Enhance your visit to New Delhi with our curated promotional packages, extended stay rewards, and complimentary breakfast upgrades.
          </p>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-stone-800/90 rounded-xl border border-stone-700/80 p-8 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-lg group relative"
            >
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded">
                  {offer.badge}
                </span>
                <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase">
                  Code: {offer.code}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-medium text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  {offer.benefit}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-700/60 mt-auto">
                <div className="text-[11px] text-stone-400 mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{offer.condition}</span>
                </div>

                <button
                  onClick={() => {
                    if (offer.id === 'free-breakfast') {
                      onApplyOffer(offer.code, 'deluxe-room');
                    } else {
                      onApplyOffer(offer.code);
                    }
                  }}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-all flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Claim Offer & Book</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

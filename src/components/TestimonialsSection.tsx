import React from 'react';
import { TESTIMONIALS } from '../data/hotelData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
            <span>Guest Impressions</span>
            <span aria-hidden="true">·</span>
            <span>Unfiltered Reviews</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight text-balance">
            Loved by Discerning Travelers
          </h2>
          <p className="text-stone-600 text-base mt-3 leading-relaxed">
            Read what international travelers and corporate dignitaries say about their stay at Grand Palace Hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col justify-between hover:border-amber-300 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-stone-300 mb-3" />
                <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60">
                <div className="font-serif text-base font-semibold text-stone-900">
                  {t.name}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {t.role} · {t.location}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 tabular-nums">
                  Stayed {t.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

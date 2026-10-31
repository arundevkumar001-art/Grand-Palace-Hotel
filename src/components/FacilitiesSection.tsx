import React from 'react';
import { FACILITIES } from '../data/hotelData';
import { Waves, Utensils, Wifi, Dumbbell, BellRing, Car, Sparkles, Briefcase, Clock } from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5" />;
      case 'ConciergeBell':
        return <BellRing className="w-5 h-5" />;
      case 'Car':
        return <Car className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="facilities" className="py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
            <span>World-Class Amenities</span>
            <span aria-hidden="true">·</span>
            <span>5-Star Comfort</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight text-balance">
            Exceptional Facilities Designed for Leisure & Productivity
          </h2>
          <p className="text-stone-600 text-base mt-4 leading-relaxed">
            Whether taking an invigorating dip in our azure pool, holding high-level symposiums, or relishing round-the-clock culinary room service, Grand Palace provides unmatched convenience.
          </p>
        </div>

        {/* Feature Spotlight: Swimming Pool + Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Visual Feature: Swimming Pool (span 7) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col group">
            <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
              <img
                src="/src/assets/images/facility_pool_1793432171656.jpg"
                alt="Azure swimming pool at Grand Palace Hotel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase block mb-1">
                  Signature Feature
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                  The Azure Oasis Swimming Pool
                </h3>
                <p className="text-stone-200 text-xs sm:text-sm mt-1 max-w-xl">
                  Temperature-controlled waters, teak loungers, and private poolside beverage service amidst lush palms.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Daily: 06:00 AM – 10:00 PM</span>
              </div>
              <span className="text-xs font-medium text-stone-700">
                Towels, lockers & sun care provided
              </span>
            </div>
          </div>

          {/* Quick Facility Highlights (span 5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {FACILITIES.slice(1, 4).map((facility) => (
              <div
                key={facility.id}
                className="p-5 bg-white rounded-lg border border-stone-200/90 shadow-xs hover:border-amber-300 transition-colors flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700 shrink-0">
                  {getFacilityIcon(facility.iconName)}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif text-lg font-medium text-stone-900">
                      {facility.name}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {facility.description}
                  </p>
                  {facility.timing && (
                    <span className="inline-block text-[11px] font-medium text-amber-700 mt-2">
                      {facility.timing}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.slice(4).map((facility) => (
            <div
              key={facility.id}
              className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-amber-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 mb-4">
                  {getFacilityIcon(facility.iconName)}
                </div>
                <h4 className="font-serif text-xl font-medium text-stone-900 mb-2">
                  {facility.name}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {facility.description}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Operational Hours</span>
                <span className="font-semibold text-stone-800">{facility.timing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

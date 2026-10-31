import React, { useState } from 'react';
import { ROOMS, Room } from '../data/hotelData';
import { Check, Users, Maximize2, Eye, CalendarCheck, Sparkles, X, Wifi, Tv, Wind, Coffee } from 'lucide-react';

interface RoomsSectionProps {
  onSelectRoom: (roomId: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
  const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(null);

  return (
    <section id="rooms" className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
              <span>Accommodations</span>
              <span aria-hidden="true">·</span>
              <span>Rooms & Suites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight text-balance">
              Thoughtfully Designed for Rest & Rejuvenation
            </h2>
            <p className="text-stone-600 text-base mt-4 leading-relaxed">
              Every room at Grand Palace Hotel seamlessly pairs artisanal craftsmanship with state-of-the-art hospitality conveniences.
            </p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="text-xs text-stone-400 block uppercase tracking-wider mb-1">
              Guaranteed Best Rates Direct
            </span>
            <span className="text-sm font-medium text-stone-700">
              Complimentary Wi-Fi & 24/7 Room Service in all rooms
            </span>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Room Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Offer notice if any */}
                {room.highlightOffer && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{room.highlightOffer}</span>
                  </div>
                )}

                {/* Category kicker */}
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-medium block">
                    {room.category}
                  </span>
                  <span className="font-serif text-xl font-normal">
                    {room.name}
                  </span>
                </div>

                {/* Quick inspect button */}
                <button
                  onClick={() => setSelectedRoomDetails(room)}
                  className="absolute bottom-4 right-4 p-2 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md transition-colors"
                  title="View full room photos and details"
                  aria-label={`View details for ${room.name}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Room Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Price Banner */}
                  <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-stone-100">
                    <div>
                      <span className="font-serif text-3xl font-semibold text-stone-900 tabular-nums">
                        ₹{room.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-500 font-normal ml-1.5">
                        / night + taxes
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{room.capacity}</span>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {room.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2.5 mb-6">
                    {room.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedRoomDetails(room)}
                    className="flex-1 py-2.5 px-3 border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-semibold tracking-wider uppercase rounded transition-colors text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold tracking-wider uppercase rounded shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoomDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <button
              onClick={() => setSelectedRoomDetails(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/9 relative overflow-hidden bg-stone-900">
              <img
                src={selectedRoomDetails.image}
                alt={selectedRoomDetails.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase block mb-1">
                  {selectedRoomDetails.category}
                </span>
                <h3 className="font-serif text-3xl font-medium">
                  {selectedRoomDetails.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">Nightly Tariff</div>
                  <div className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                    ₹{selectedRoomDetails.price.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-stone-500 ml-1">/ night</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-stone-600">
                  <div>
                    <span className="block text-stone-400 uppercase tracking-wider">Capacity</span>
                    <span className="font-semibold text-stone-800">{selectedRoomDetails.capacity}</span>
                  </div>
                  <div>
                    <span className="block text-stone-400 uppercase tracking-wider">Room Size</span>
                    <span className="font-semibold text-stone-800">{selectedRoomDetails.size}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {selectedRoomDetails.description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">Room Inclusions & Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedRoomDetails.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-100">
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => setSelectedRoomDetails(null)}
                  className="px-5 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = selectedRoomDetails.id;
                    setSelectedRoomDetails(null);
                    onSelectRoom(id);
                  }}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reserve This Room</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

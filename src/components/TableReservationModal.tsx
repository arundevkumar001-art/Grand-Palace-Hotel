import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, Utensils } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({ isOpen, onClose }) => {
  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState('Royal Main Hall');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('Casual Dining');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const ref = `TBL-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef(ref);
  };

  const handleReset = () => {
    setConfirmedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium">Table Reservation</h3>
              <p className="text-[11px] text-stone-300">The Royal Dining Salon · Grand Palace Hotel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
            aria-label="Close table reservation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedRef ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest block">
                Table Reserved
              </span>
              <h4 className="font-serif text-2xl font-normal text-stone-900 mt-1 mb-2">
                We Look Forward to Welcoming You
              </h4>
              <p className="text-stone-600 text-xs max-w-sm mx-auto mb-6">
                Your reservation for {guests} guests at {seatingArea} on {date} at {time} is confirmed.
              </p>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs mb-6 inline-block">
                <span className="text-stone-500">Table Code: </span>
                <span className="font-mono font-bold text-stone-900">{confirmedRef}</span>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="19:00">07:00 PM (Dinner)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={8}>8+ Guests (Banquet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Seating Area
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Royal Main Hall">Royal Main Hall (Chandeliers)</option>
                    <option value="Private Dining Alcove">Private Dining Alcove</option>
                    <option value="Poolside Terrace">Poolside Courtyard Terrace</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Occasion
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Casual Dining">Casual Dining / Leisure</option>
                  <option value="Anniversary / Celebration">Anniversary / Birthday Celebration</option>
                  <option value="Business Luncheon">Executive Business Dinner</option>
                  <option value="Family Gathering">Family Gathering</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors"
                >
                  Confirm Table Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

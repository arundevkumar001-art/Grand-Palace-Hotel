import React, { useState, useEffect } from 'react';
import { ROOMS, Room, SPECIAL_OFFERS, HOTEL_INFO } from '../data/hotelData';
import { X, Calendar, Users, Check, Sparkles, BedDouble, Shield, ChevronRight, ArrowLeft, Printer, Download } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    offerCode?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefill }) => {
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(prefill?.roomId || 'deluxe-room');
  const [checkIn, setCheckIn] = useState<string>(prefill?.checkIn || formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState<string>(prefill?.checkOut || formatDate(defaultCheckOut));
  const [guests, setGuests] = useState<number>(prefill?.guests || 2);
  const [promoCode, setPromoCode] = useState<string>(prefill?.offerCode || '');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(prefill?.offerCode || null);

  // Add-ons
  const [addons, setAddons] = useState<{
    airportPickup: boolean;
    spaPackage: boolean;
    candlelightDinner: boolean;
  }>({
    airportPickup: false,
    spaPackage: false,
    candlelightDinner: false
  });

  // Guest Details
  const [guestDetails, setGuestDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    arrivalHour: '14:00',
    specialRequests: ''
  });

  // Confirmation reference
  const [reservationRef, setReservationRef] = useState<string>('');

  useEffect(() => {
    if (prefill?.roomId) setSelectedRoomId(prefill.roomId);
    if (prefill?.checkIn) setCheckIn(prefill.checkIn);
    if (prefill?.checkOut) setCheckOut(prefill.checkOut);
    if (prefill?.guests) setGuests(prefill.guests);
    if (prefill?.offerCode) {
      setPromoCode(prefill.offerCode);
      setAppliedPromo(prefill.offerCode);
    }
  }, [prefill]);

  if (!isOpen) return null;

  const currentRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[1];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Base Room Tariff
  const baseTariff = currentRoom.price * nights;

  // Check discount eligibility
  let discountPercentage = 0;
  let discountReason = '';

  const dayOfWeek = checkInDate.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;

  if (nights >= 5 || appliedPromo === 'STAY5PLUS') {
    discountPercentage = 20;
    discountReason = '20% Long Stay Discount (5+ nights)';
  } else if (isWeekend || appliedPromo === 'WEEKEND15') {
    discountPercentage = 15;
    discountReason = '15% Weekend Special Discount';
  } else if (appliedPromo === 'DELUXEBF' || currentRoom.id === 'deluxe-room') {
    discountReason = 'Complimentary Breakfast Included with Deluxe Room';
  }

  const discountAmount = Math.round((baseTariff * discountPercentage) / 100);
  const roomTariffAfterDiscount = baseTariff - discountAmount;

  // Addons cost
  let addonsCost = 0;
  if (addons.airportPickup) addonsCost += 1500;
  if (addons.spaPackage) addonsCost += 2200;
  if (addons.candlelightDinner) addonsCost += 2800;

  // Taxes (12% standard GST for luxury hotel)
  const gstRate = 0.12;
  const taxes = Math.round((roomTariffAfterDiscount + addonsCost) * gstRate);
  const grandTotal = roomTariffAfterDiscount + addonsCost + taxes;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (['WEEKEND15', 'DELUXEBF', 'STAY5PLUS'].includes(clean)) {
      setAppliedPromo(clean);
    } else {
      alert('Invalid offer code. Available codes: WEEKEND15, DELUXEBF, STAY5PLUS');
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestDetails.fullName || !guestDetails.email || !guestDetails.phone) {
      alert('Please fill in required guest contact information.');
      return;
    }
    const randRef = `GPH-DEL-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationRef(randRef);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-amber-500/70 flex items-center justify-center bg-amber-500/10">
              <span className="font-serif text-amber-400 font-bold text-sm">G</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium">Grand Palace Hotel Reservations</h3>
              <p className="text-[11px] text-stone-300">Connaught Place, New Delhi · Direct Booking Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${step === 1 ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-800'}`}>
              1
            </span>
            <span className={step === 1 ? 'font-semibold text-stone-900' : ''}>Dates & Rooms</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${step === 2 ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-800'}`}>
              2
            </span>
            <span className={step === 2 ? 'font-semibold text-stone-900' : ''}>Guest Details</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-800'}`}>
              3
            </span>
            <span className={step === 3 ? 'font-semibold text-stone-900' : ''}>Confirmation Voucher</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  1. Select Room Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ROOMS.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`cursor-pointer rounded-lg border p-3 flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-500/20'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="aspect-16/10 rounded overflow-hidden mb-2 relative">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {room.highlightOffer && (
                            <span className="absolute bottom-1 left-1 bg-amber-600 text-[9px] text-white px-1.5 py-0.5 rounded font-semibold uppercase">
                              {room.highlightOffer}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif font-medium text-stone-900 text-sm">
                            {room.name}
                          </h4>
                          <span className="text-[11px] text-stone-500 block">
                            {room.bedType}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900 tabular-nums">
                            ₹{room.price.toLocaleString('en-IN')}
                            <span className="text-[10px] font-normal text-stone-500"> /nt</span>
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Check-in (12:00 PM)
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={formatDate(today)}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Check-out (11:00 AM)
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || formatDate(today)}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults / Family</option>
                  </select>
                </div>
              </div>

              {/* Promo code input */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full">
                    <span className="text-xs font-semibold text-stone-700 block mb-1">
                      Promotional Voucher Code
                    </span>
                    <input
                      type="text"
                      placeholder="Try: WEEKEND15, DELUXEBF, STAY5PLUS"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded text-xs uppercase font-mono text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="sm:self-end px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
                  >
                    Apply Code
                  </button>
                </div>
                {discountReason && (
                  <div className="mt-2 text-xs text-amber-700 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Active Benefit: {discountReason}</span>
                  </div>
                )}
              </div>

              {/* Optional Addons */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  2. Optional Enhancements
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addons.airportPickup}
                        onChange={(e) => setAddons({ ...addons, airportPickup: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold text-stone-900 block">Airport Chauffeur Transfer (One-Way)</span>
                        <span className="text-stone-500">Luxury sedan pickup from IGI Airport New Delhi</span>
                      </div>
                    </div>
                    <span className="font-bold text-stone-800 tabular-nums">+₹1,500</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addons.spaPackage}
                        onChange={(e) => setAddons({ ...addons, spaPackage: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <div>
                        <span className="font-semibold text-stone-900 block">Ayurvedic Rejuvenation Spa Session (60 min)</span>
                        <span className="text-stone-500">Herbal oils & aromatherapy treatment for 1 guest</span>
                      </div>
                    </div>
                    <span className="font-bold text-stone-800 tabular-nums">+₹2,200</span>
                  </label>
                </div>
              </div>

              {/* Pricing Summary Breakdown */}
              <div className="p-4 bg-stone-100/80 rounded-lg border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Room Tariff ({nights} {nights === 1 ? 'night' : 'nights'} × ₹{currentRoom.price.toLocaleString('en-IN')})</span>
                  <span className="tabular-nums">₹{baseTariff.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700 font-semibold">
                    <span>Discount ({discountPercentage}% Applied)</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {addonsCost > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Enhancements & Add-ons</span>
                    <span className="tabular-nums">₹{addonsCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Taxes & Luxury GST (12%)</span>
                  <span className="tabular-nums">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-stone-300 flex justify-between text-sm font-bold text-stone-900">
                  <span>Estimated Total</span>
                  <span className="text-amber-700 font-serif text-lg tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Guest Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">{currentRoom.name}</span> · {nights} {nights === 1 ? 'Night' : 'Nights'} ({checkIn} to {checkOut})
                </div>
                <div className="font-bold font-serif text-base text-amber-900 tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Roy"
                    value={guestDetails.fullName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address * (For Confirmation Voucher)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Expected Arrival Time (Check-in from 12:00 PM)
                  </label>
                  <select
                    value={guestDetails.arrivalHour}
                    onChange={(e) => setGuestDetails({ ...guestDetails, arrivalHour: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="12:00">12:00 PM (Standard Check-in)</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="22:00">10:00 PM (Late Night Arrival - 24/7 Desk)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. High floor preference, quiet courtyard view, extra feather pillows, anniversary floral arrangement..."
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No advance payment needed today. Payment settled directly at front desk upon check-in. Free cancellation up to 24 hours prior.</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors"
                >
                  Confirm Reservation & Generate Voucher
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Confirmed Slip */}
              <div className="border border-stone-300 rounded-xl overflow-hidden shadow-xs bg-white">
                <div className="bg-emerald-800 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-700 border border-emerald-500 flex items-center justify-center shrink-0">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-emerald-200 font-semibold block">
                        Reservation Confirmed & Guaranteed
                      </span>
                      <h3 className="font-serif text-2xl font-medium">
                        Welcome to Grand Palace Hotel
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-200 uppercase tracking-widest block">Reference ID</span>
                    <span className="font-mono text-base font-bold text-white tracking-wider tabular-nums">
                      {reservationRef}
                    </span>
                  </div>
                </div>

                <div className="p-6 divide-y divide-stone-100 text-xs space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-2">
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block">Guest Name</span>
                      <span className="font-semibold text-stone-900 text-sm">{guestDetails.fullName}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block">Room Booked</span>
                      <span className="font-semibold text-stone-900 text-sm">{currentRoom.name}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block">Dates</span>
                      <span className="font-semibold text-stone-900 text-sm">{checkIn} to {checkOut} ({nights} nt)</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block">Occupancy</span>
                      <span className="font-semibold text-stone-900 text-sm">{guests} Guests</span>
                    </div>
                  </div>

                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block mb-1">Check-in Instructions</span>
                      <p className="text-stone-600 leading-relaxed">
                        Grand Palace Hotel, Connaught Place, New Delhi. Front desk is open 24/7. Check-in time: 12:00 PM. Please present government-issued photo ID upon check-in.
                      </p>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block mb-1">Total Folio Amount</span>
                      <div className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </div>
                      <span className="text-stone-500 text-[11px] block mt-0.5">
                        Payable at check-in / check-out. (Taxes included).
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Booking Voucher</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

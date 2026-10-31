/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { RestaurantSection } from './components/RestaurantSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TableReservationModal } from './components/TableReservationModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    offerCode?: string;
  } | undefined>(undefined);

  const handleOpenBooking = (prefill?: {
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    offerCode?: string;
  }) => {
    setBookingPrefill(prefill);
    setBookingModalOpen(true);
  };

  const handleSelectRoom = (roomId: string) => {
    setBookingPrefill({ roomId });
    setBookingModalOpen(true);
  };

  const handleApplyOffer = (offerCode: string, targetRoomId?: string) => {
    setBookingPrefill({
      offerCode,
      roomId: targetRoomId || 'deluxe-room'
    });
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation Bar complying with the Top Bar Contract */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero with Quick Booking Bar */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. About Us & Basic Info Dossier */}
        <AboutSection />

        {/* 3. Rooms & Suites Collection */}
        <RoomsSection onSelectRoom={handleSelectRoom} />

        {/* 4. Hotel Facilities & Amenities */}
        <FacilitiesSection />

        {/* 5. Restaurant Dining & Menu */}
        <RestaurantSection onOpenTableReservation={() => setTableModalOpen(true)} />

        {/* 6. Special Offers & Discounts */}
        <SpecialOffersSection onApplyOffer={handleApplyOffer} />

        {/* 7. Hotel Photo Gallery */}
        <GallerySection />

        {/* 8. Discerning Guest Reviews */}
        <TestimonialsSection />

        {/* 9. Contact Us & Concierge Desk */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Reservation Flow Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        prefill={bookingPrefill}
      />

      {/* Restaurant Table Reservation Modal */}
      <TableReservationModal
        isOpen={tableModalOpen}
        onClose={() => setTableModalOpen(false)}
      />
    </div>
  );
}

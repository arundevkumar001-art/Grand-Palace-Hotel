import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Rooms & Suites', href: '#rooms' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Dining', href: '#restaurant' },
    { name: 'Offers', href: '#offers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3.5'
            : 'bg-stone-950/40 backdrop-blur-xs border-b border-white/10 py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, one line */}
          <a
            href="#"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-full border border-amber-500/60 flex items-center justify-center bg-amber-500/10">
              <span className="font-serif text-amber-500 font-bold text-lg">G</span>
            </div>
            <span
              className={`font-serif text-xl sm:text-2xl tracking-wider font-semibold uppercase transition-colors ${
                isScrolled ? 'text-stone-900' : 'text-white'
              }`}
            >
              {HOTEL_INFO.name}
            </span>
          </a>

          {/* Zone 2: 4-5 nav links, 1-2 word labels, single line */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-amber-600 focus:outline-hidden ${
                  isScrolled ? 'text-stone-700' : 'text-stone-200 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded transition-colors ${
                isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-stone-200 hover:text-white'
              }`}
              title="Call Reception 24/7"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="tabular-nums">{HOTEL_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] rounded shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Your Stay</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded focus:outline-hidden ${
                isScrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-stone-950/60 backdrop-blur-sm">
          <div className="fixed top-16 right-0 left-0 bg-white border-b border-stone-200 shadow-xl p-6 transition-transform">
            <div className="flex flex-col gap-4 text-base font-medium text-stone-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded hover:bg-stone-50 hover:text-amber-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-stone-600 px-3">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <a href={`tel:${HOTEL_INFO.phone}`} className="tabular-nums font-medium text-stone-900">
                    {HOTEL_INFO.phone}
                  </a>
                  <span className="text-xs text-stone-400">· 24/7 Concierge</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs tracking-wider uppercase rounded shadow-sm transition-colors text-center"
                >
                  Book Your Stay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

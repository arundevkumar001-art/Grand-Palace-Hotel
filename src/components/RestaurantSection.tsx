import React, { useState } from 'react';
import { RESTAURANT_MENU, MenuItem } from '../data/hotelData';
import { Utensils, Clock, ShoppingBag, Plus, Minus, Check, Calendar, Coffee, Sparkles } from 'lucide-react';

interface RestaurantSectionProps {
  onOpenTableReservation: () => void;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({ onOpenTableReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [orderCart, setOrderCart] = useState<{ [itemId: string]: number }>({});
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [roomNumber, setRoomNumber] = useState<string>('');

  const categories = ['All', 'Mains', 'Rice & Biryani', 'Breads', 'Beverages'];

  const filteredMenu = activeCategory === 'All'
    ? RESTAURANT_MENU
    : RESTAURANT_MENU.filter((item) => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setOrderCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeFromCart = (item: MenuItem) => {
    setOrderCart((prev) => {
      const current = prev[item.id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return { ...prev, [item.id]: current - 1 };
    });
  };

  const totalCartCount = Object.values(orderCart).reduce((a, b) => a + b, 0);
  const cartTotalAmount = Object.entries(orderCart).reduce((sum, [id, qty]) => {
    const item = RESTAURANT_MENU.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handlePlaceRoomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalCartCount === 0) return;
    setOrderSubmitted(true);
  };

  const resetCart = () => {
    setOrderCart({});
    setOrderSubmitted(false);
    setRoomNumber('');
  };

  return (
    <section id="restaurant" className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
            <span>Culinary Excellence</span>
            <span aria-hidden="true">·</span>
            <span>The Royal Dining Salon</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight text-balance">
            Authentic Flavors, Royal Ambience
          </h2>
          <p className="text-stone-600 text-base mt-4 leading-relaxed">
            Savor masterfully crafted North Indian delicacies, aromatic dum biryanis, artisan breads, and chilled beverages, served under grand amber chandeliers or brought straight to your guestroom.
          </p>
        </div>

        {/* Feature Split: Dining Room Photo + Atmosphere & Table Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 rounded-xl overflow-hidden shadow-md border border-stone-200 aspect-16/10 relative group">
            <img
              src="/src/assets/images/restaurant_dining_1793432171111.jpg"
              alt="The Royal Dining Salon fine dining restaurant interior at Grand Palace Hotel"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase block mb-1">
                Fine Dining
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal">
                The Royal Dining Salon
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                Open daily for breakfast, royal lunch thalis, and candlelight dinners.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-stone-500 text-xs uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Service Hours: 07:00 AM – 11:30 PM</span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
                Reserve Your Dining Experience
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Host an intimate anniversary dinner, family banquet, or executive luncheon in our heritage dining hall. Enjoy dedicated sommelier service and personalized chef menus.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>Private dining alcoves available for celebrations</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>Special weekend buffet discounts and chef tastings</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>24/7 in-room culinary delivery throughout hotel</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTableReservation}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Reserve a Table Online</span>
            </button>
          </div>
        </div>

        {/* Restaurant Menu Showcase */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                Curated Restaurant Menu
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                All prices in Indian Rupees (₹). Authentic recipes prepared fresh by our master culinary brigade.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      {/* Dietary dot indicator */}
                      <span
                        className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                          item.dietary === 'veg'
                            ? 'border-emerald-600'
                            : 'border-red-600'
                        }`}
                        title={item.dietary === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        />
                      </span>
                      <h4 className="font-serif text-lg font-medium text-stone-900">
                        {item.name}
                      </h4>
                    </div>

                    <span className="font-serif text-xl font-bold text-amber-700 tabular-nums shrink-0">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider">
                    {item.category}
                  </span>

                  {/* Room service order button */}
                  <div className="flex items-center gap-2">
                    {orderCart[item.id] ? (
                      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded px-2 py-1">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="p-0.5 text-stone-700 hover:text-stone-900"
                          aria-label={`Remove one ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-amber-900 tabular-nums px-1">
                          {orderCart[item.id]}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-0.5 text-stone-700 hover:text-stone-900"
                          aria-label={`Add one ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3 h-3 text-amber-700" />
                        <span>Order to Room</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Room Service Order Tray */}
          {totalCartCount > 0 && (
            <div className="p-6 bg-stone-900 text-white rounded-xl shadow-xl border border-stone-800">
              {orderSubmitted ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-white">
                        Room Service Order Dispatched to Room {roomNumber || 'Guest Suite'}!
                      </h4>
                      <p className="text-xs text-stone-300">
                        Our culinary team is preparing your dishes fresh. Estimated delivery: 20-30 minutes.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetCart}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceRoomOrder} className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl font-medium">In-Room Culinary Tray</span>
                        <span className="text-xs text-amber-400 font-bold tabular-nums">
                          ({totalCartCount} {totalCartCount === 1 ? 'item' : 'items'})
                        </span>
                      </div>
                      <div className="text-xs text-stone-300 mt-0.5">
                        Total Tariff: <span className="text-amber-400 font-bold text-sm tabular-nums">₹{cartTotalAmount.toLocaleString('en-IN')}</span> (billed to your room folio upon delivery)
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <input
                      type="text"
                      placeholder="Room Number (e.g. 304)"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      required
                      className="px-4 py-2 bg-stone-800 border border-stone-700 rounded text-sm text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-500 w-full sm:w-48"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase rounded shadow transition-all whitespace-nowrap"
                    >
                      Send Order to Room Service
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderCart({})}
                      className="text-xs text-stone-400 hover:text-stone-200 px-2 py-1"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

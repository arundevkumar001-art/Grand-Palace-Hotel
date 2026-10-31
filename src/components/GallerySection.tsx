import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/hotelData';
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Rooms', 'Architecture', 'Facilities', 'Dining'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item: typeof GALLERY_ITEMS[0]) => {
    const idx = GALLERY_ITEMS.indexOf(item);
    setLightboxIndex(idx);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold tracking-widest uppercase mb-3">
              <span>Visual Journey</span>
              <span aria-hidden="true">·</span>
              <span>Hotel Gallery</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight text-balance">
              Glimpses of Grand Palace Hotel
            </h2>
            <p className="text-stone-600 text-base mt-3 leading-relaxed">
              Explore the neoclassical grandeur, serene waters, private residential suites, and gastronomic dining halls.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => openLightbox(item)}
              className="group relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer bg-stone-200 shadow-xs border border-stone-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-amber-400 text-xs uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-xl font-medium mt-1">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>

              <div className="absolute top-4 right-4 p-2 bg-stone-950/60 backdrop-blur-xs text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="max-h-[75vh] w-auto overflow-hidden rounded-lg shadow-2xl">
              <img
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center mt-4 text-white">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                {GALLERY_ITEMS[lightboxIndex].category} · {lightboxIndex + 1} of {GALLERY_ITEMS.length}
              </span>
              <h3 className="font-serif text-2xl font-normal mt-1">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h3>
              <p className="text-sm text-stone-300 max-w-xl mx-auto mt-1">
                {GALLERY_ITEMS[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

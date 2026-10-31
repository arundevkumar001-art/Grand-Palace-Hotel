export interface Room {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  bedType: string;
  capacity: string;
  size: string;
  view: string;
  description: string;
  features: string[];
  image: string;
  highlightOffer?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string;
  badge?: string;
  timing?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Mains' | 'Rice & Biryani' | 'Breads' | 'Beverages';
  description: string;
  dietary: 'veg' | 'non-veg';
  popular?: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  code: string;
  discountPercentage?: number;
  benefit: string;
  condition: string;
  badge: string;
}

export const HOTEL_INFO = {
  name: "Grand Palace Hotel",
  stars: 5,
  classification: "5-Star Luxury Heritage Hotel",
  tagline: "Experience Luxury, Feel at Home.",
  heading: "Your Perfect Stay Begins Here.",
  subheading: "Enjoy luxury, comfort and exceptional hospitality at Grand Palace Hotel.",
  about: "Welcome to Grand Palace Hotel, where luxury meets comfort. Enjoy beautifully designed rooms, delicious food, world-class hospitality and unforgettable experiences in the heart of New Delhi.",
  location: "New Delhi, India",
  address: "Connaught Place, New Delhi, India 110001",
  phone: "+91 98765 43210",
  email: "info@grandpalace.example",
  opening: "24/7 Concierge & Reception",
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
};

export const ROOMS: Room[] = [
  {
    id: "standard-room",
    name: "Standard Room",
    category: "Classic Comfort",
    price: 2500,
    bedType: "1 Double Bed",
    capacity: "2 Guests",
    size: "280 sq.ft / 26 m²",
    view: "Courtyard & Atrium View",
    description: "Ideal for business travelers or short weekend breaks, featuring a plush double bed, whisper-quiet climate control, and ergonomic workspace.",
    features: [
      "1 Double Bed",
      "Free Wi-Fi",
      "Air Conditioning",
      "En-suite Modern Bathroom",
      "Daily Housekeeping",
      "Coffee & Tea Maker"
    ],
    image: "/src/assets/images/room_standard_1793432168254.jpg"
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    category: "City Skyline",
    price: 4000,
    bedType: "King Size Bed",
    capacity: "2 Adults + 1 Child",
    size: "420 sq.ft / 39 m²",
    view: "Panoramic City View",
    description: "Generously appointed with expansive floor-to-ceiling vistas of Delhi's skyline, premium king bedding, and an entertainment system for pure relaxation.",
    features: [
      "King Size Bed",
      "City View",
      "Smart TV (55-inch 4K)",
      "Free Wi-Fi & High Speed LAN",
      "Air Conditioning",
      "Complimentary Morning Breakfast"
    ],
    image: "/src/assets/images/room_deluxe_1793432168422.jpg",
    highlightOffer: "Free Breakfast Included"
  },
  {
    id: "luxury-suite",
    name: "Luxury Suite",
    category: "Presidential Luxury",
    price: 7500,
    bedType: "King Size Master Bed",
    capacity: "3 Adults or 2 Adults + 2 Kids",
    size: "780 sq.ft / 72 m²",
    view: "Connaught Place Heritage View",
    description: "The crown jewel of Grand Palace Hotel. Offers a private living lounge, bespoke Italian marble bathroom, personalized butler assistance, and lavish breakfast spreads.",
    features: [
      "Premium Master Bedroom",
      "Private Living Room & Dining Area",
      "Complimentary Royal Breakfast",
      "Italian Marble Bath & Rain Shower",
      "24/7 Butler on Call",
      "Complimentary Evening Cocktail Hour"
    ],
    image: "/src/assets/images/room_luxury_suite_1793432169764.jpg",
    highlightOffer: "Complimentary Suite Privileges"
  }
];

export const FACILITIES: Facility[] = [
  {
    id: "pool",
    name: "Swimming Pool",
    description: "A crystal-clear azure outdoor pool flanked by teak loungers, private day cabanas, and sunset beverage service.",
    iconName: "Waves",
    timing: "06:00 AM - 10:00 PM"
  },
  {
    id: "restaurant",
    name: "Fine Dining Restaurant",
    description: "A grand culinary salon with crystal chandeliers offering authentic royal Indian dishes, tandoor specials, and continental delights.",
    iconName: "Utensils",
    timing: "07:00 AM - 11:30 PM"
  },
  {
    id: "wifi",
    name: "Free High-Speed Wi-Fi",
    description: "Enterprise-grade fiber internet across all guest rooms, public salons, gardens, and meeting facilities.",
    iconName: "Wifi",
    timing: "24/7 Available"
  },
  {
    id: "gym",
    name: "Gym & Fitness Center",
    description: "Equipped with state-of-the-art cardio units, strength training racks, free weights, and on-demand personal fitness coaches.",
    iconName: "Dumbbell",
    timing: "05:00 AM - 11:00 PM"
  },
  {
    id: "room-service",
    name: "24/7 Room Service",
    description: "Gourmet dishes, midnight snacks, and freshly brewed coffees brought promptly to your bedside at any hour.",
    iconName: "ConciergeBell",
    timing: "24/7 Non-Stop"
  },
  {
    id: "parking",
    name: "Free Valet Parking",
    description: "Secure, covered multi-tier parking with dedicated complimentary valet attendants and electric vehicle charging ports.",
    iconName: "Car",
    timing: "24/7 Attendants"
  },
  {
    id: "spa",
    name: "Spa & Wellness",
    description: "Holistic Ayurvedic therapies, aromatherapy steam chambers, sauna, and restorative Swedish massages.",
    iconName: "Sparkles",
    timing: "08:00 AM - 09:00 PM"
  },
  {
    id: "conference",
    name: "Conference Hall & Banquets",
    description: "Acoustically isolated boardrooms and a grand ballroom with motorized projection screens for up to 350 delegates.",
    iconName: "Briefcase",
    timing: "On Reservation"
  }
];

export const RESTAURANT_MENU: MenuItem[] = [
  {
    id: "m1",
    name: "Paneer Butter Masala",
    price: 250,
    category: "Mains",
    description: "Fresh cottage cheese cubes simmered in a velvety, mildly spiced butter and tomato-cashew reduction.",
    dietary: "veg",
    popular: true
  },
  {
    id: "m2",
    name: "Veg Biryani",
    price: 180,
    category: "Rice & Biryani",
    description: "Fragrant aged basmati rice slow-cooked on dum with seasonal garden vegetables, mint, and saffron.",
    dietary: "veg",
    popular: true
  },
  {
    id: "m3",
    name: "Butter Naan",
    price: 40,
    category: "Breads",
    description: "Traditional clay-oven tandoori leavened flatbread brushed with golden farm butter.",
    dietary: "veg",
    popular: false
  },
  {
    id: "m4",
    name: "Chicken Biryani",
    price: 280,
    category: "Rice & Biryani",
    description: "Succulent pieces of marinated chicken layered with saffron-infused basmati rice, caramelized onions, and royal spices.",
    dietary: "non-veg",
    popular: true
  },
  {
    id: "m5",
    name: "Cold Coffee",
    price: 100,
    category: "Beverages",
    description: "Chilled espresso churned with rich whole milk, artisanal syrup, and topped with chocolate curls.",
    dietary: "veg",
    popular: true
  },
  {
    id: "m6",
    name: "Fresh Juice",
    price: 80,
    category: "Beverages",
    description: "Cold-pressed freshly squeezed seasonal fruit choice: Sweet Lime, Valencia Orange, or Pomegranate.",
    dietary: "veg",
    popular: false
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "weekend-discount",
    title: "Weekend Getaway Discount",
    code: "WEEKEND15",
    discountPercentage: 15,
    benefit: "15% discount on all weekend bookings (stays checking in or staying on Fri/Sat/Sun).",
    condition: "Valid on all room categories for weekend dates.",
    badge: "15% OFF"
  },
  {
    id: "free-breakfast",
    title: "Complimentary Royal Breakfast",
    code: "DELUXEBF",
    benefit: "Lavish multi-cuisine buffet breakfast included free with every Deluxe Room stay.",
    condition: "Automatically applied when booking any Deluxe Room.",
    badge: "FREE BREAKFAST"
  },
  {
    id: "extended-stay",
    title: "Long Stay Privileges",
    code: "STAY5PLUS",
    discountPercentage: 20,
    benefit: "Enjoy a generous 20% discount on total room tariff when booking for 5 or more nights.",
    condition: "Applicable on bookings of 5 nights or longer.",
    badge: "20% OFF"
  }
];

export const TESTIMONIALS = [
  {
    name: "Vikramaditya Roy",
    role: "Managing Director, Global Logistics",
    location: "Mumbai",
    text: "Grand Palace Hotel truly lives up to its name. The Connaught Place location makes meetings effortless, and returning to the quiet Luxury Suite felt like entering an oasis.",
    rating: 5,
    date: "October 2026"
  },
  {
    name: "Eleanor Vance",
    role: "Architect & Travel Writer",
    location: "London, UK",
    text: "The architectural elegance of the grand facade paired with impeccable 5-star service. The Paneer Butter Masala and Chicken Biryani at the restaurant were nothing short of legendary.",
    rating: 5,
    date: "September 2026"
  },
  {
    name: "Ananya & Rohan Sengupta",
    role: "Leisure Travelers",
    location: "Bengaluru",
    text: "We booked the Deluxe Room with the 15% weekend discount and free breakfast. The swimming pool at dusk was sensational. We cannot wait to return!",
    rating: 5,
    date: "August 2026"
  }
];

export const GALLERY_ITEMS = [
  {
    title: "Grand Palace Hotel Facade",
    category: "Architecture",
    image: "/src/assets/images/hero_grand_palace_1793432167108.jpg",
    caption: "The majestic neoclassical architecture in Connaught Place at twilight"
  },
  {
    title: "Luxury Suite Living Area",
    category: "Rooms",
    image: "/src/assets/images/room_luxury_suite_1793432169764.jpg",
    caption: "Opulent private living salon with Italian marble and velvet seating"
  },
  {
    title: "Azure Outdoor Pool & Cabanas",
    category: "Facilities",
    image: "/src/assets/images/facility_pool_1793432171656.jpg",
    caption: "Heated swimming pool with private day cabanas and tranquil foliage"
  },
  {
    title: "Deluxe Room Skyline View",
    category: "Rooms",
    image: "/src/assets/images/room_deluxe_1793432168422.jpg",
    caption: "Floor-to-ceiling panoramic views over New Delhi"
  },
  {
    title: "The Royal Dining Salon",
    category: "Dining",
    image: "/src/assets/images/restaurant_dining_1793432171111.jpg",
    caption: "Fine dining ambiance with crystal chandeliers and authentic gourmet cuisine"
  },
  {
    title: "Standard Room Comfort",
    category: "Rooms",
    image: "/src/assets/images/room_standard_1793432168254.jpg",
    caption: "Modern minimalist warmth designed for effortless comfort"
  }
];

import type { FeatureIconName } from "@/types/featureIcons";

export type InnerPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  heroImage: string;
  intro: { heading: string; body: string };
  features: { icon: FeatureIconName; title: string; description: string }[];
  steps: { num: string; title: string; description: string }[];
  stats?: { value: string; label: string }[];
  gallery?: { title: string; image: string }[];
  packages?: {
    name: string;
    price: string;
    features: string[];
    featured?: boolean;
    badge?: string;
  }[];
  cta: { title: string; body: string; button: string };
};

export const INNER_PAGES: Record<string, InnerPageData> = {
  "visa-services": {
    slug: "visa-services",
    eyebrow: "Visa Services, Main Focus",
    title: "Expert Visa Consultancy",
    highlight: "& Documentation",
    subtitle: "USA, UK, Schengen & Canada visa assistance with complete file preparation.",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "High-quality documentation increases your chances of approval",
      body: "We don't just book tickets. We prepare complete visa-ready travel files. Cover letters, itineraries, insurance, and professional consultation, all handled by our experienced team.",
    },
    features: [
      { icon: "flag", title: "USA, UK, Schengen & Canada", description: "Expert visa assistance for the world's most requested destinations." },
      { icon: "file-text", title: "Visit Visa File Preparation", description: "Complete documentation: forms, financials, and supporting papers organized." },
      { icon: "compass", title: "Cover Letters & Itinerary", description: "Embassy-ready letters and day-by-day travel plans written for you." },
      { icon: "shield", title: "Travel Insurance", description: "Comprehensive travel protection arranged as part of your application." },
    ],
    steps: [
      { num: "01", title: "Free Consultation", description: "Share your travel purpose and we assess eligibility and recommend the right visa type." },
      { num: "02", title: "File Preparation", description: "We prepare cover letters, itinerary, and organize every required document." },
      { num: "03", title: "Review & Submit", description: "Final quality check before embassy submission or appointment booking." },
      { num: "04", title: "Approval Support", description: "Track your application and prepare you for interviews if required." },
    ],
    stats: [
      { value: "100+", label: "Visa Files Prepared" },
      { value: "1250+", label: "Visas Approved" },
      { value: "24H", label: "Live Support" },
    ],
    cta: { title: "Ready to apply?", body: "Get a free visa assessment. We reply the same day on WhatsApp.", button: "Apply for Visa Now" },
  },
  evisas: {
    slug: "evisas",
    eyebrow: "Fast-Track eVisas",
    title: "Digital Visa",
    highlight: "Processing",
    subtitle: "Umrah eVisa, UAE, Turkey, and Asia-Pacific with quick online applications.",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "Skip the embassy queue and apply online",
      body: "Fast-track e-visa processing for eligible countries. Umrah eVisa, Gulf states, and popular holiday destinations, processed digitally with same-day options where available.",
    },
    features: [
      { icon: "zap", title: "Instant Approval Options", description: "Same-day confirmation for eligible e-visa categories." },
      { icon: "stamp", title: "Umrah eVisa Processing", description: "Complete Umrah visa handled as part of your pilgrimage package." },
      { icon: "building-2", title: "Gulf & Middle East", description: "UAE, Saudi Arabia, Qatar, and surrounding regions." },
      { icon: "plane", title: "Asia Pacific", description: "Turkey, Malaysia, Thailand, and popular holiday e-visas." },
    ],
    steps: [
      { num: "01", title: "Send Documents", description: "Passport scan and photo via WhatsApp for quick and secure processing." },
      { num: "02", title: "We Apply Online", description: "Our team submits your e-visa application on your behalf." },
      { num: "03", title: "Receive eVisa", description: "Approved visa delivered to your email and WhatsApp." },
      { num: "04", title: "Travel Ready", description: "Print or digital copy and you're ready to fly." },
    ],
    stats: [
      { value: "48H", label: "Avg. Processing" },
      { value: "100+", label: "Success Rate %" },
      { value: "24H", label: "Support" },
    ],
    cta: { title: "Need an eVisa fast?", body: "WhatsApp us your destination and travel dates for instant guidance.", button: "Get Free Consultation" },
  },
  "flights-hotels": {
    slug: "flights-hotels",
    eyebrow: "Flights & Hotels",
    title: "Hassle-Free",
    highlight: "Travel Booking",
    subtitle: "International & domestic air ticketing and hotel reservations worldwide.",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "Travel Services: worldwide planning made simple",
      body: "International & domestic air ticketing, hotel reservations worldwide, and complete trip planning based on your budget, preferences, and visa requirements.",
    },
    features: [
      { icon: "plane", title: "Air Ticketing", description: "International and domestic flights at competitive rates." },
      { icon: "hotel", title: "Hotel Reservations", description: "Worldwide hotel bookings from budget to 5-star luxury." },
      { icon: "shield", title: "Secure Booking", description: "Transparent pricing, e-tickets, and vouchers via WhatsApp." },
      { icon: "zap", title: "Fast Confirmation", description: "Same-day quotes and instant booking confirmation." },
    ],
    steps: [
      { num: "01", title: "Share Details", description: "Dates, destinations, travelers, and budget preferences." },
      { num: "02", title: "Compare Options", description: "We send the best flight and hotel combinations." },
      { num: "03", title: "Book & Pay", description: "Secure payment with full price transparency." },
      { num: "04", title: "Fly with Confidence", description: "Tickets, vouchers, and 24/7 in-trip support." },
    ],
    stats: [
      { value: "580+", label: "Families Booked" },
      { value: "100+", label: "Destinations" },
      { value: "24H", label: "Support" },
    ],
    cta: { title: "Book your flights & hotels", body: "Get the best rates with a free quote on WhatsApp today.", button: "WhatsApp Us" },
  },
  holidays: {
    slug: "holidays",
    eyebrow: "Holiday Packages",
    title: "Customized",
    highlight: "Dream Holidays",
    subtitle: "Europe, UAE, Asia: honeymoon, family, educational & group tours.",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "We design trips based on your budget and visa requirements",
      body: "Customized holiday packages for Europe, UAE, and Asia. Honeymoon escapes, family adventures, educational trips, and group tours, all with visa support included.",
    },
    features: [
      { icon: "map-pin", title: "Europe, UAE & Asia", description: "Handpicked destinations with complete travel planning." },
      { icon: "heart", title: "Honeymoon & Family Trips", description: "Romantic getaways and family-friendly itineraries." },
      { icon: "graduation-cap", title: "Educational Tours", description: "Student groups and educational travel programs." },
      { icon: "users", title: "Group Tours", description: "Organized group travel with fixed or flexible schedules." },
    ],
    steps: [
      { num: "01", title: "Choose Destination", description: "Tell us your dream location and travel dates." },
      { num: "02", title: "Customize Package", description: "Flights, hotels, activities, built around your budget." },
      { num: "03", title: "Visa & Insurance", description: "We handle visa files and travel insurance together." },
      { num: "04", title: "Enjoy Your Trip", description: "Travel with full support before and during your journey." },
    ],
    gallery: [
      { title: "Santorini, Greece", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop" },
      { title: "Dubai, UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop" },
      { title: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop" },
      { title: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600&auto=format&fit=crop" },
    ],
    cta: { title: "Plan your holiday", body: "Free consultation and we'll design the perfect package for you.", button: "Get Free Consultation" },
  },
  umrah: {
    slug: "umrah",
    eyebrow: "Religious Travel",
    title: "Comfortable &",
    highlight: "Affordable Umrah",
    subtitle: "5★ & 4★ packages with Umrah eVisa and complete support from visa to transport.",
    heroImage: "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "Complete support from visa to hotel and transport",
      body: "Comfortable and affordable Umrah packages. 5-star and 4-star options, customized economy packages, and Umrah eVisa processing, all handled by our dedicated team.",
    },
    features: [
      { icon: "hotel", title: "5★ & 4★ Umrah Packages", description: "Premium hotels near Haram with walking distance options." },
      { icon: "sparkles", title: "Customized Economy", description: "Budget-friendly packages without compromising on support." },
      { icon: "stamp", title: "Umrah eVisa Processing", description: "Complete visa handling included in every package." },
      { icon: "car", title: "Ground Transport", description: "Airport transfers, ziyarat tours, and chauffeur services." },
    ],
    steps: [
      { num: "01", title: "Choose Package", description: "Silver Economy, Premium Gold, or VVIP Deluxe." },
      { num: "02", title: "Visa & Documents", description: "Passport, photos, and Umrah eVisa. We handle everything." },
      { num: "03", title: "Travel & Stay", description: "Flights, hotel check-in, and ground transport arranged." },
      { num: "04", title: "Blessed Return", description: "Safe journey home with memories for a lifetime." },
    ],
    packages: [
      { name: "Silver Economy", price: "$850", features: ["14 Days Package", "3-Star Hotels (Bus Service)", "Umrah eVisa & Insurance"] },
      { name: "Premium Gold", price: "$1,250", features: ["4-Star Hotels (Walking Distance)", "Half-Board Breakfast", "VIP Ground Transport"], featured: true, badge: "Most Popular" },
      { name: "VVIP Deluxe", price: "$1,950", features: ["5-Star Clock Tower Hotels", "Full Board Buffet", "Business Class Option"] },
    ],
    cta: { title: "Begin your Umrah journey", body: "WhatsApp us for dates, group availability, and package details.", button: "WhatsApp Us" },
  },
  about: {
    slug: "about",
    eyebrow: "About Us",
    title: "B&B Travel Store",
    highlight: "Your Travel Partner",
    subtitle: "Trusted by families & business clients across Pakistan.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "We don't just book tickets. We prepare complete visa-ready travel files",
      body: "B&B Travel Store is a full-service travel agency specializing in visa consultancy, e-visas, holiday packages, Umrah, and worldwide flight & hotel bookings. Founded by passionate travelers, built for Pakistani families and business clients.",
    },
    features: [
      { icon: "file-text", title: "Visa File Experts", description: "Cover letters, itineraries, and complete documentation support." },
      { icon: "heart", title: "Family Trusted", description: "580+ families satisfied with honest, transparent service." },
      { icon: "users", title: "Business Clients", description: "Corporate travel and business visa support available." },
      { icon: "globe", title: "Worldwide Reach", description: "Partners across airlines, hotels, and embassies globally." },
    ],
    steps: [
      { num: "01", title: "Listen", description: "We understand your travel goals, budget, and visa needs." },
      { num: "02", title: "Prepare", description: "Complete files, bookings, and itineraries, done right." },
      { num: "03", title: "Deliver", description: "Fixed pricing, written scope, on-time delivery." },
      { num: "04", title: "Support", description: "24/7 WhatsApp support before, during, and after travel." },
    ],
    stats: [
      { value: "100+", label: "Visa Files Prepared" },
      { value: "580+", label: "Happy Families" },
      { value: "1250+", label: "Visas Approved" },
    ],
    cta: { title: "Let's work together", body: "Reach out for a free consultation with same day reply guaranteed.", button: "Get Free Consultation" },
  },
  contact: {
    slug: "contact",
    eyebrow: "Contact Us",
    title: "Get Free",
    highlight: "Consultation",
    subtitle: "WhatsApp us, call, or visit. Our travel experts reply the same day.",
    heroImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920&auto=format&fit=crop",
    intro: {
      heading: "Ready to start your journey?",
      body: "Have questions about visas, holidays, Umrah, or flights? Message us on WhatsApp for the fastest response. We offer free consultations with no obligation.",
    },
    features: [
      { icon: "message-circle", title: "WhatsApp (Fastest)", description: "Same-day replies during business hours. Send passport copy & travel dates." },
      { icon: "globe", title: "Google Reviews", description: "See what our clients say and leave your own review after your trip." },
      { icon: "shield", title: "Free Consultation", description: "No obligation visa assessment and travel quote, completely free." },
      { icon: "users", title: "Expert Team", description: "Speak directly with visa specialists and travel consultants." },
    ],
    steps: [
      { num: "01", title: "Message Us", description: "WhatsApp your destination, dates, and travel purpose." },
      { num: "02", title: "Get a Quote", description: "Clear pricing in PKR with written scope and no surprises." },
      { num: "03", title: "Confirm", description: "Approve your package and complete secure payment." },
      { num: "04", title: "Travel", description: "Receive documents and 24/7 support throughout." },
    ],
    cta: { title: "Chat with us now", body: "Two lines about your trip and we reply with a clear scope and price.", button: "WhatsApp Us" },
  },
};

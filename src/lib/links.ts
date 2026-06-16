import { SITE } from "@/lib/siteConfig";

export const LINKS = {
  home: "/",
  contact: "/contact",
  about: "/about",
  visaServices: "/visa-services",
  evisas: "/evisas",
  holidays: "/holidays",
  umrah: "/umrah",
  flightsHotels: "/flights-hotels",
  whatsapp: SITE.whatsapp,
  googleReview: SITE.googleReview,
  tawkChat: SITE.tawk.chatUrl,
} as const;

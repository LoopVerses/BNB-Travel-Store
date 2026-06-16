"use client";

import {
  Building2,
  Car,
  Compass,
  FileText,
  Flag,
  Globe,
  GraduationCap,
  Heart,
  Hotel,
  MapPin,
  MessageCircle,
  Mountain,
  Plane,
  Ship,
  Shield,
  Sparkles,
  Stamp,
  TrainFront,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { FeatureIconName } from "@/types/featureIcons";

export const FEATURE_ICONS: Record<FeatureIconName, LucideIcon> = {
  flag: Flag,
  "file-text": FileText,
  compass: Compass,
  shield: Shield,
  zap: Zap,
  stamp: Stamp,
  "building-2": Building2,
  plane: Plane,
  hotel: Hotel,
  "map-pin": MapPin,
  heart: Heart,
  "graduation-cap": GraduationCap,
  users: Users,
  sparkles: Sparkles,
  car: Car,
  "message-circle": MessageCircle,
  globe: Globe,
  mountain: Mountain,
  ship: Ship,
  train: TrainFront,
};

export function FeatureIcon({
  name,
  size = 28,
  className = "mb-5 text-gold",
}: {
  name: FeatureIconName;
  size?: number;
  className?: string;
}) {
  const Icon = FEATURE_ICONS[name];
  return <Icon size={size} className={className} strokeWidth={1.75} />;
}

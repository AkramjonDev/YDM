import {
  Droplet,
  GraduationCap,
  Landmark,
  Laptop,
  Leaf,
  Mountain,
  Palette,
  PersonStanding,
  Soup,
  Star,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { SoftPowerIcon } from "@/data/soft-power";

// lucide component for each soft-power direction's `icon` name.
export const softPowerIcons = {
  landmark: Landmark,
  mountain: Mountain,
  soup: Soup,
  "person-standing": PersonStanding,
  leaf: Leaf,
  droplet: Droplet,
  "trending-up": TrendingUp,
  laptop: Laptop,
  "graduation-cap": GraduationCap,
  palette: Palette,
  star: Star,
} satisfies Record<SoftPowerIcon, LucideIcon>;

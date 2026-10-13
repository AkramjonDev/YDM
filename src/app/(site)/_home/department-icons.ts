import {
  Bird,
  BriefcaseBusiness,
  ChartLine,
  Globe,
  GraduationCap,
  HeartHandshake,
  Megaphone,
  Palette,
  Sparkle,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { DepartmentIcon } from "@/data/departments";

// lucide component for each department's `icon` name.
export const departmentIcons = {
  globe: Globe,
  "graduation-cap": GraduationCap,
  "chart-line": ChartLine,
  palette: Palette,
  megaphone: Megaphone,
  "heart-handshake": HeartHandshake,
  users: Users,
  bird: Bird,
  sparkle: Sparkle,
  "briefcase-business": BriefcaseBusiness,
} satisfies Record<DepartmentIcon, LucideIcon>;

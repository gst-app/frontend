import { ROUTES } from "@/config/routes";
import {
  ChartColumn,
  ClipboardList,
  LayoutDashboard,
  Settings,
  TrendingUp,
  UserRound,
} from "lucide-react";

export const STUDENT_NAV = [
  { label: "Dashboard", href: ROUTES.STUDENT.DASHBOARD, icon: LayoutDashboard },
  {
    label: "Assessment",
    href: ROUTES.STUDENT.ASSESSMENT,
    icon: ClipboardList,
  },
  {
    label: "Summary",
    href: ROUTES.STUDENT.SUMMARY,
    icon: ChartColumn,
  },
  {
    label: "Progress",
    href: ROUTES.STUDENT.PROGRESS,
    icon: TrendingUp,
  },
  {
    label: "Profile",
    href: ROUTES.STUDENT.PROFILE,
    icon: UserRound,
  },
  {
    label: "Settings",
    href: ROUTES.STUDENT.SETTINGS,
    icon: Settings,
  },
];

export const ADMIN_NAV = [];

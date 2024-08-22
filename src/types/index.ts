import { Role } from "@/db/schema";
import { LucideIcon } from "lucide-react";

export type UserId = number;

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
  role?: Role[];
}

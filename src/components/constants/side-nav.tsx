import {
  BookOpenCheck,
  LayoutDashboard,
  UserCircle,
  Users,
} from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/pages/dashboard",
    color: "text-sky-500",
    role: ["admin"],
  },
  {
    title: "Users",
    icon: Users,
    href: "/pages/users",
    color: "text-sky-500",
  },
  {
    title: "Account",
    icon: UserCircle,
    href: "/pages/users/profile",
    color: "text-sky-500",
  },
  {
    title: "Example",
    icon: BookOpenCheck,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Example-01",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/examples/profile",
      },
      {
        title: "Example-02",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "Example-03",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
  {
    title: "Prova",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
];

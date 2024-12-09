"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { ArrowLeft } from "lucide-react";
import { SideNav } from "./side-nav";
import { Role } from "@/db/schemaLogin";
import { NavItems } from "@/components/constants/side-nav";

interface SidebarProps {
  className?: string;
  role: Role;
}

export default function Sidebar({ className, role }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  const navItemsForRoles = NavItems.filter(
    (item) => item.role?.includes(role) || item.role == undefined,
  );

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-8 md:block`,
        status && "duration-500",
        isOpen ? "w-72" : "w-[78px]",
        className,
      )}
    >
      <ArrowLeft
        className={cn(
          "absolute -right-3 top-5 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          !isOpen && "rotate-180",
        )}
        onClick={handleToggle}
      />
      <div>
        <div className="px-3 py-2">
          <div>
            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={navItemsForRoles}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

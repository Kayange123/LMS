"use client";
import React from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex w-full items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20"
      )}
    >
      <div className="flex flex-1 items-center gap-x-2 py-4">
        <Icon
          size={23}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      {isActive && <ChevronRight className="text-neutral-400 pr-2" />}
    </button>
  );
};

export default SidebarItem;

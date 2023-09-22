import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="h-full border-r w-full flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default SideBar;

import React from "react";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "@/components/navbar/NavbarRoutes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full w-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;

import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";
import NavbarRoutes from "@/components/navbar/NavbarRoutes";
const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="h-7 w-7" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

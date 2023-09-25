import React from "react";
import SideBar from "./_components/SideBar";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[60px] fixed inset-y-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="hidden md:flex w-48 h-full fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <main className="h-full md:ml-48 mt-[65px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;

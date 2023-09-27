import React from "react";
import { CourseNavbarProps } from "./CourseNavbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./CourseSidebar";

const CourseMobileNavabar = ({ course, progress }: CourseNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-72 p-0 bg-white" side="left">
        <CourseSidebar course={course} userProgress={progress} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileNavabar;

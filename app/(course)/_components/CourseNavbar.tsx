import NavbarRoutes from "@/components/navbar/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileNavabar from "./CourseMobileNavabar";

export interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progress: number;
}

const CourseNavbar = ({ course, progress }: CourseNavbarProps) => {
  return (
    <div className="h-full flex items-center p-4 border-b bg-white shadow-sm">
      <CourseMobileNavabar course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;

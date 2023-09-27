import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebarItem from "./CourseSidebarItem";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  userProgress: number;
}

const CourseSidebar = async ({ course, userProgress }: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return (
    <div className="h-full border-r flex flex-col shadow-sm overflow-y-auto">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Check purchase and progress */}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isComplete={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={chapter.courseId}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;

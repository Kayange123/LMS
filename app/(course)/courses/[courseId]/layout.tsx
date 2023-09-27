import { fetchProgress } from "@/actions/actions";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebar from "../../_components/CourseSidebar";
import CourseNavbar from "../../_components/CourseNavbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) redirect("/");

  const progress = await fetchProgress(userId, course.id);
  return (
    <div className="h-full">
      <div className="h-[60px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progress={progress} />
      </div>
      <div className="hidden md:flex mt-[60px] h-full w-80 flex-col fixed inset-y-0 -z-50">
        <CourseSidebar course={course} userProgress={progress} />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CourseLayout;

import { IconBadge } from "@/components/ui/iconBadge";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";

const CourseIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { userId } = auth();
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!userId || !course) {
    redirect("/");
  }

  const requiredFields = [
    course.description,
    course.title,
    course.imageUrl,
    course.categoryId,
    course.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-base md:text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h1 className="text-base md:text-lg">Customise your course!</h1>
          </div>
          <TitleForm initialData={course} courseId={course?.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;

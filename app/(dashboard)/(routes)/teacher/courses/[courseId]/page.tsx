import { IconBadge } from "@/components/ui/iconBadge";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageUploadForm from "./_components/ImageUploadForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import Banner from "@/components/ui/banner";
import CourseActions from "./_components/CourseActions";

const CourseIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  if (!course) {
    redirect("/");
  }

  const requiredFields = [
    course.description,
    course.title,
    course.imageUrl,
    course.categoryId,
    course.price,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is not published. It's not visible to learners" />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-base md:text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              complete all fields {completionText}
            </span>
          </div>
          <CourseActions
            courseId={params.courseId}
            disabled={!isComplete}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-10">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h1 className="text-base md:text-lg">Customise your course!</h1>
            </div>
            <TitleForm initialData={course} courseId={course?.id} />
            <DescriptionForm initialData={course} courseId={course?.id} />
            <ImageUploadForm initialData={course} courseId={course?.id} />
            <CategoryForm
              initialData={course}
              courseId={course?.id}
              options={categories.map((category) => ({
                label: category?.name,
                value: category?.id,
              }))}
            />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <div className="">
                <ChaptersForm initialData={course} courseId={course?.id} />
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-lg">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course?.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-lg">Resources and Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course?.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;

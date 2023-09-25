import { IconBadge } from "@/components/ui/iconBadge";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "../_components/ChapterTitleForm";
import ChapterDescriptionForm from "../_components/ChapterDescriptionForm";
import ChapterAccessForm from "../_components/ChapterAccessForm";
import VideoUploadForm from "../_components/VideoUploadForm";
import Banner from "@/components/ui/banner";
import ChapterActions from "../_components/ChapterActions";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isPublishable = requiredFields.every(Boolean);

  return (
    <>
      {!chapter?.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is not published. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className=" flex items-center font-semibold text-base hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter creation</h1>
                <span className="text-sm text-slate-700">
                  Complete add fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isPublishable}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 ">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              chapterId={chapter?.id}
              courseId={params.courseId}
              initialData={chapter}
            />
            <ChapterDescriptionForm
              chapterId={chapter.id}
              courseId={params.courseId}
              initialData={chapter}
            />
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                chapterId={chapter.id}
                courseId={params.courseId}
              />
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-lg">Add video</h2>
            </div>
            <VideoUploadForm
              initialData={chapter}
              chapterId={chapter?.id}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;

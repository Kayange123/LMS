import { fetchChapter } from "@/actions/actions";
import Banner from "@/components/ui/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import Preview from "@/components/preview";
import { File } from "lucide-react";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    userProgress,
    muxData,
    attachments,
    course,
    purchase,
    nextChapter,
  } = await fetchChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });
  if (!course || !chapter) {
    return redirect("/");
  }
  const isLocked = !chapter.isFree || !purchase;
  const completeOnEnd = !!purchase || !userProgress?.isCompleted;
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You don't have access to this course, purchase first"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="">
          <div className="flex items-center p-4 flex-col md:flex-row justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <div></div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course?.price!}
              />
            )}
          </div>
          <div>
            <Preview value={course.description!} />
          </div>
          {!!attachments.length && (
            <>
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

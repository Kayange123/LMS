"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/ui/fileUpload";

const titleSchema = z.object({
  videoUrl: z.string().min(3, { message: "Image is required" }),
});

interface VideoUploadFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const VideoUploadForm = ({
  initialData,
  courseId,
  chapterId,
}: VideoUploadFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof titleSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data);
      toast.success("chapter updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        <h2>Chapter video</h2>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && "Cancel"}
          {!isEditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add video
            </>
          )}
          {!isEditing && initialData?.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData?.videoUrl ? (
          <div className="flex flex-col items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
            <p className="text-slate-500 text-sm">No image</p>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        )
      ) : (
        <div className="">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <p className=" text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </p>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <p className="text-xs mt-2 text-muted-foreground">
          Videos can take long to upload, Refresh the page if it does not appear
        </p>
      )}
    </div>
  );
};

export default VideoUploadForm;

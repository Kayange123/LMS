"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/ui/fileUpload";

const titleSchema = z.object({
  url: z.string().min(1),
});

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}
const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof titleSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, data);
      toast.success("course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      router.refresh();
      toast.success("attachment deleted");
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        <h2>Course Attachments</h2>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <>
          {initialData.attachments.length === 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments provided
            </p>
          ) : (
            <div className="space-y-2">
              {initialData?.attachments.map((attachment) => (
                <div
                  key={attachment?.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment?.name}</p>
                  {deletingId === attachment?.id ? (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(attachment?.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <p className=" text-xs text-muted-foreground mt-4">
            Add anything needed for this course. eg books
          </p>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;

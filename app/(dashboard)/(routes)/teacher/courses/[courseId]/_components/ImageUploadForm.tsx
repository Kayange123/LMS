"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/ui/fileUpload";

const titleSchema = z.object({
  imageUrl: z.string().min(3, { message: "Image is required" }),
});

interface ImageUploadFormProps {
  initialData: Course;
  courseId: string;
}
const ImageUploadForm = ({ initialData, courseId }: ImageUploadFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (data: z.infer<typeof titleSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast.success("course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex font-medium items-center justify-between">
        <h2>Course Image</h2>
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && "cancel"}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData?.imageUrl ? (
          <div className="flex flex-col items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
            <p className="text-slate-500 text-sm">No image</p>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              fill
              className="object-cover rounded-md"
              alt="upload image"
              src={initialData?.imageUrl}
            />
          </div>
        )
      ) : (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <p className=" text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;

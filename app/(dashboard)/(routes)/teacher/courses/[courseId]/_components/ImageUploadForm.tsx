"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { FileUpload } from "@/components/ui/fileUpload";
import { url } from "inspector";

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
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
    },
  });
  const toggleEdit = () => setIsEditing((current) => !current);
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof titleSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast.success("course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
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

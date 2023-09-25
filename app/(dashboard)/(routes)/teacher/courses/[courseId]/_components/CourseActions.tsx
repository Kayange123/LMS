"use client";
import ConfirmDialog from "@/components/modals/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("course published successfully");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("course published successfully");
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Chapter deleted successfully");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={handleClick}
        disabled={disabled || isLoading}
        size="sm"
        variant="outline"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmDialog onConfirm={onDelete}>
        <Button disabled={isLoading} size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </ConfirmDialog>
    </div>
  );
};

export default CourseActions;

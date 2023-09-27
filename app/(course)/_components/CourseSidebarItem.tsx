"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, LucideIcon, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isLocked: boolean;
  isComplete: boolean;
  courseId: string;
}

const CourseSidebarItem = ({
  id,
  label,
  isComplete,
  isLocked,
  courseId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon: LucideIcon = isLocked
    ? Lock
    : isComplete
    ? CheckCircle
    : PlayCircle;

  const isActive = pathname.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <Button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 px-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isComplete && "text-emerald-700 hover:text-emerald-700",
        isComplete && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-3 py-4">
        <Icon
          size={25}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isComplete && "text-emerald-700"
          )}
        />
        <p>{label}</p>
      </div>
      <div
        className={cn(
          " ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isComplete && "border-emerald-700"
        )}
      />
    </Button>
  );
};

export default CourseSidebarItem;

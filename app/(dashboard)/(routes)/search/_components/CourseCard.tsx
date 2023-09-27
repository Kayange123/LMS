import { IconBadge } from "@/components/ui/iconBadge";
import { priceFormatter } from "@/lib/priceFormat";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  id: string;
  price: number;
  title: string;
  description: string;
  progress: number;
  imageUrl: string;
  chaptersLength: number;
  category: string;
}
const CourseCard = ({
  id,
  price,
  progress,
  imageUrl,
  title,
  category,
  description,
  chaptersLength,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            className="object-cover"
            fill
            alt="Course cover"
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <p className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </p>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center text-sm gap-x-2 md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge icon={BookOpen} size={"sm"} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <div>Progress</div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {priceFormatter(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

import { CourseWithProgressWithCategory } from "@/actions/actions";
import React from "react";
import CourseCard from "./CourseCard";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}
const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      {items.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground mt-10">
          No results found
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <CourseCard
              id={item.id}
              title={item.title}
              description={item.description!}
              imageUrl={item.imageUrl!}
              price={item.price!}
              progress={item.progress!}
              category={item?.category?.name!}
              chaptersLength={item.chapters.length}
              key={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesList;

"use client";

import { Button } from "@/components/ui/button";
import { priceFormatter } from "@/lib/priceFormat";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  return (
    <Button className="w-full md:w-auto">
      Enroll for {priceFormatter(price)}
    </Button>
  );
};

export default CourseEnrollButton;

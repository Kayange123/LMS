"use client";

import { Button } from "@/components/ui/button";
import { priceFormatter } from "@/lib/priceFormat";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`);
      toast.loading("Redirecting to payment gateway...");
      window.location.assign(res.data.url);
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button disabled={isLoading} onClick={onClick} className="w-full md:w-auto">
      Enroll for {priceFormatter(price)}
    </Button>
  );
};

export default CourseEnrollButton;

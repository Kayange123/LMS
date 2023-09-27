import { db } from "@/lib/prismadb";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "@/components/ui/searchInput";
import { fetchCourses } from "@/actions/actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "./_components/CoursesList";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) redirect("/");
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await fetchCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className=" px-6 pt-6 md:hidden md:pb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;

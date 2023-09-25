import { db } from "@/lib/prismadb";
import React from "react";
import Categories from "./_components/Categories";
import SearchInput from "@/components/ui/searchInput";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className=" px-6 pt-6 md:hidden md:pb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default SearchPage;

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./_components/DataTable";
import { Columns } from "./_components/Columns";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={Columns} data={courses} />
    </div>
  );
};

export default CoursesPage;

import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.courseId) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }
    await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

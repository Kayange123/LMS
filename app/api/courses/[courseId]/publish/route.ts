import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
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
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) return new NextResponse("Course not found", { status: 404 });

    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished
    );
    if (
      !course.title ||
      !hasPublishedChapters ||
      !course.categoryId ||
      !course.imageUrl ||
      !course.description
    ) {
      return new NextResponse("Missed some of required fields", {
        status: 401,
      });
    }

    await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
  } catch (error) {
    console.log("PUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

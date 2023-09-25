import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { title } = await req.json();
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!courseId) return new NextResponse("Bad request", { status: 400 });
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPostion = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        position: newPostion,
        title,
        courseId,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

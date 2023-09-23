import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { url } = await req.json();
    const { userId } = auth();
    const { courseId } = params;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!courseId)
      return new NextResponse("Bad request- courseId required", {
        status: 400,
      });

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

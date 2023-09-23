import { db } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { courseId, attachmentId } = params;
    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) return new Response("Unauthorized", { status: 401 });
    await db.attachment.delete({
      where: {
        courseId,
        id: attachmentId,
      },
    });
    return new Response("deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

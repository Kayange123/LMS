import { db } from "@/lib/prismadb";
import { Category, Chapter, Course, UserProgress } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export const fetchCourses = async (
  userId: string,
  title?: string,
  categoryId?: string
): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const cousrseWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await fetchProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return cousrseWithProgress;
  } catch (error) {
    throw new Error("Failed to get courses");
  }
};

export const fetchProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / publishedChapters.length) * 100;

    return progressPercentage;
  } catch (error) {
    throw new Error("Error getting progress");
  }
};

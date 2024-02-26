import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";

export const getUserAudits = async (take: number) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return [];
    }

    const user = await currentUser();

    const activities = await prismadb?.activityLog?.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: take,
      take: 1,
    });

    const data = activities?.map((audit) => ({
      ...audit,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      imageUrl: user?.imageUrl!,
    }));

    return data;
  } catch (error) {
    return [];
  }
};

import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";

interface countersInterface {
  workSpaceCount: number;
  notesCount: number;
  chaptersCount: number;
}

let countsData: countersInterface = {
  workSpaceCount: 0,
  notesCount: 0,
  chaptersCount: 0,
};

export const getCounters = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return countsData;
    }

    const workspace = await prismadb?.workSpace?.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const workSpaceids = workspace?.map((data) => data?.id);

    countsData.workSpaceCount = workSpaceids?.length;

    countsData.notesCount = await prismadb?.note?.count({
      where: {
        workSpaceId: {
          in: workSpaceids,
        },
      },
    });

    countsData.chaptersCount = await prismadb?.chapter?.count({
      where: {
        userId,
      },
    });

    return countsData;
  } catch (error) {
    return countsData;
  }
};

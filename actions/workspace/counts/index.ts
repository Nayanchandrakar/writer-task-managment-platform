import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";

interface countersInterface {
  workSpaceCount: number;
  notesCount: number;
}

let countsData: countersInterface = {
  workSpaceCount: 0,
  notesCount: 0,
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

    const ids = workspace?.map((data) => data?.id);

    countsData.workSpaceCount = ids?.length;

    countsData.notesCount = await prismadb?.note?.count({
      where: {
        workSpaceId: {
          in: ids,
        },
      },
    });

    return countsData;
  } catch (error) {
    return countsData;
  }
};

import { auth } from "@clerk/nextjs";
import { MAX_FREE_lIMIT_COUNT } from "@constants";
import prismadb from "@lib/prismadb";

interface limitsInterface {
  chapterLimit: number;
  workSpaceLimit: number;
  noteLimit: number;
}

let limitsData = {
  chapterLimit: 0,
  workSpaceLimit: 0,
  noteLimit: 0,
};

export const getLimits = async (): Promise<limitsInterface> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return limitsData;
    }

    let limits = await prismadb?.userLimits?.findFirst({
      where: {
        userId,
      },
    });

    if (!limits) {
      limits = await prismadb?.userLimits?.create({
        data: {
          userId,
        },
      });
    }

    limitsData.workSpaceLimit = limits?.workSpaceLimit!;
    limitsData.noteLimit = limits?.noteLimit!;
    limitsData.chapterLimit = limits?.chapterLimit!;

    return limitsData;
  } catch (error) {
    return limitsData;
  }
};

export const increaseLimit = async (
  incrementType: "chapter" | "note" | "workspace"
): Promise<limitsInterface> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return limitsData;
    }

    let limits = await prismadb?.userLimits?.findFirst({
      where: {
        userId,
      },
    });

    if (!limits) {
      limits = await prismadb?.userLimits?.create({
        data: {
          userId,
        },
      });
    }

    let data: limitsInterface = limitsData;

    if (incrementType === "chapter") {
      data.chapterLimit = limits?.chapterLimit + 1;
    } else if (incrementType === "note") {
      data.noteLimit = limits?.noteLimit + 1;
    } else if (incrementType === "workspace") {
      data.workSpaceLimit = limits?.workSpaceLimit + 1;
    }

    const increaseLimit = await prismadb?.userLimits?.update({
      where: {
        userId,
      },
      data,
    });

    limitsData.workSpaceLimit = increaseLimit?.workSpaceLimit!;
    limitsData.noteLimit = increaseLimit?.noteLimit!;
    limitsData.chapterLimit = increaseLimit?.chapterLimit!;

    return limitsData;
  } catch (error) {
    return limitsData;
  }
};

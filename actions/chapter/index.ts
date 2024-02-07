import { auth } from "@clerk/nextjs";
import { actionHandler } from "../../types/action-types";
import { formSchema, formType } from "./schema";
import { handlerOutputType } from "./type";
import prismadb from "@lib/prismadb";
import { getCounters } from "@actions/workspace/counts";
import { getSubscription } from "@actions/subscription/get";
import { MAX_FREE_CHPATERS_COUNT } from "@constants";
import { getLimits } from "@actions/global/getLimits";

const handler = async (req: formType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }

    const { isPro } = await getSubscription();

    if (!isPro) {
      const { noteLimit } = await getLimits();

      if (!(noteLimit <= MAX_FREE_CHPATERS_COUNT.chapters)) {
        return {
          error: "305",
        };
      }
    }

    const { chapterTitle, imageUrl } = req;

    const chapter = await prismadb?.chapter?.create({
      data: {
        chapterImage: imageUrl,
        title: chapterTitle,
        userId,
      },
    });
  } catch (error) {
    return {
      error: "Internal server error!",
    };
  }
};

export const createChapterAction = actionHandler(formSchema, handler);

"use server";

import { actionHandler } from "../../../types/action-types";
import { formSchema, formType } from "./schema";
import { handlerOutputType } from "./type";
import prismadb from "@lib/prismadb";
import { getSubscription } from "@actions/subscription/get";
import { MAX_FREE_lIMIT_COUNT } from "@constants";
import { getLimits, increaseLimit } from "@actions/global/getLimits";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

const handler = async (req: formType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }
    const { chapterTitle, imageUrl, noteId } = req;

    const { isPro } = await getSubscription();

    if (!isPro) {
      const { noteLimit } = await getLimits();

      if (!(noteLimit < MAX_FREE_lIMIT_COUNT.chapters)) {
        return {
          error: "304",
        };
      }
    }

    const noteExist = await prismadb?.note?.findFirst({
      where: {
        id: noteId,
      },
      select: {
        id: true,
      },
    });

    if (!noteExist) {
      return {
        error: "Create a note first!",
      };
    }

    const chapter = await prismadb?.chapter?.create({
      data: {
        chapterImage: imageUrl,
        title: chapterTitle,
        userId,
        noteId: noteExist?.id,
      },
    });

    if (!chapter) {
      return {
        error: "Database error occured",
      };
    }

    revalidatePath(`/notes/${noteExist?.id}`);

    if (!isPro) {
      await increaseLimit("chapter");
    }

    return {
      data: chapter,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error!",
    };
  }
};

export const createChapterAction = actionHandler(formSchema, handler);

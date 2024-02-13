"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";

import { formSchema, formSchemaType } from "./schema";
import { handlerOutputType } from "./type";
import { actionHandler } from "../../../types/action-types";
import { revalidatePath } from "next/cache";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }

    const { chapterId, title } = req;

    const chapter = await prismadb?.chapter?.findFirst({
      where: {
        userId: userId!,
        id: chapterId,
      },
      select: {
        id: true,
      },
    });

    if (!chapter) {
      return {
        error: "no chapter found with this id !",
      };
    }

    const updateChapter = await prismadb?.chapter?.update({
      where: {
        id: chapter?.id,
        userId: userId!,
      },
      data: {
        title,
      },
    });

    revalidatePath(`/chapter/${chapter?.id}`);

    if (!updateChapter) {
      return {
        error: "Database error occured!",
      };
    }

    return {
      data: updateChapter,
    };
  } catch (error) {
    return {
      error: "Internal server error!",
    };
  }
};

export const updateChapter = actionHandler(formSchema, handler);

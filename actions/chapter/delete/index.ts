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

    const { chapterId } = req;

    const deleteChapter = await prismadb?.chapter?.delete({
      where: {
        id: chapterId,
        userId: userId!,
      },
    });

    revalidatePath(`/chapter/${deleteChapter?.id}`);

    if (!deleteChapter) {
      return {
        error: "Database error occured!",
      };
    }

    return {
      data: deleteChapter,
    };
  } catch (error) {
    return {
      error: "Internal server error!",
    };
  }
};

export const deleteChapter = actionHandler(formSchema, handler);

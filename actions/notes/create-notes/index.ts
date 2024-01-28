"use server";

import { formSchema, formSchemaType } from "./schema";
import { auth } from "@clerk/nextjs";
import { handlerOutputType } from "./types";
import { actionHandler } from "../../../types/action-types";
import prismadb from "@lib/prismadb";
import { revalidatePath } from "next/cache";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized user!",
      };
    }

    const { noteTitle, workSpaceId } = req;

    const isExist = await prismadb?.workSpace?.findFirst({
      where: {
        id: workSpaceId,
        userId,
      },
    });

    if (!isExist) {
      return {
        error: "No workspace exist!",
      };
    }

    const createNotes = await prismadb?.note?.create({
      data: {
        noteTitle,
        workSpaceId,
      },
    });

    if (!createNotes) {
      return {
        error: "Database error",
      };
    }

    revalidatePath(`/workspace/${createNotes?.id}`);

    return {
      data: createNotes,
    };
  } catch (error) {
    return {
      error: "Internal server Error",
    };
  }
};

export const createnotesAction = actionHandler(formSchema, handler);

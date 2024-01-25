"use server";

import { formSchema, formSchemaType } from "./schema";
import { auth } from "@clerk/nextjs";
import { handlerOutputType } from "./types";
import { actionHandler } from "../../../types/action-types";
import prismadb from "@lib/prismadb";

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

    const workSpaceUpdate = await prismadb?.workSpace?.update({
      where: {
        id: isExist?.id,
        userId,
      },
      data: {
        notes: {
          create: {
            noteTitle,
          },
        },
      },
    });

    if (!workSpaceUpdate) {
      return {
        error: "Database error",
      };
    }

    const updatedNotes = await prismadb?.note?.findFirst({
      where: {
        workSpaceId,
      },
    });

    if (!updatedNotes) {
      return {
        error: "Notes not exist",
      };
    }

    return {
      data: updatedNotes,
    };
  } catch (error) {
    return {
      error: "Internal server Error",
    };
  }
};

export const createnotesAction = actionHandler(formSchema, handler);

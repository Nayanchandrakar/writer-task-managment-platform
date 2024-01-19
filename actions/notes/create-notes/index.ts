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

    const { noteTitle } = req;

    const notes = await prismadb?.note?.create({
      data: {
        noteTitle,
      },
    });

    if (!notes) {
      return {
        error: "Database error",
      };
    }

    return {
      data: notes,
    };
  } catch (error) {
    return {
      error: "Internal server Error",
    };
  }
};

export const createnotesAction = actionHandler(formSchema, handler);

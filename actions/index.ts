"use server";

import { formSchema, formSchemaType } from "@actions/schema";
import { auth } from "@clerk/nextjs";
import { handlerOutputType } from "./types";
import { actionHandler } from "../types/action-types";
import prismadb from "@lib/prismadb";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized user!",
      };
    }

    const { name } = req;

    const WorkSpace = await prismadb?.workSpace?.create({
      data: {
        userId,
        name,
      },
    });

    if (!WorkSpace) {
      return {
        error: "Database error",
      };
    }

    return {
      data: WorkSpace,
    };
  } catch (error) {
    return {
      error: "Internal server Error",
    };
  }
};

export const createWorkSpaceAction = actionHandler(formSchema, handler);

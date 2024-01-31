"use server";

import {
  formSchema,
  formSchemaType,
} from "@actions/workspace/create-worspace/schema";
import { auth } from "@clerk/nextjs";
import { handlerOutputType } from "./types";
import { actionHandler } from "../../../types/action-types";
import prismadb from "@lib/prismadb";
import { revalidatePath } from "next/cache";
import { getSubscription } from "@actions/subscription/get";
import { getCounters } from "../counts";
import { MAX_FREE_lIMIT_COUNT } from "@constants";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized user!",
      };
    }

    const { name } = req;

    const { isPro } = await getSubscription();

    if (!isPro) {
      const { workSpaceCount } = await getCounters();

      if (!(workSpaceCount <= MAX_FREE_lIMIT_COUNT.workspace)) {
        return {
          error: "304",
        };
      }
    }

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

    revalidatePath(`/workspace/${WorkSpace?.id}`);

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

"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import prismadb from "@lib/prismadb";

import {
  formSchema,
  formSchemaType,
} from "@actions/workspace/create-worspace/schema";
import { handlerOutputType } from "./types";
import { actionHandler } from "../../../types/action-types";
import { getSubscription } from "@actions/subscription/get";
import { MAX_FREE_lIMIT_COUNT } from "@constants";
import { getLimits, increaseLimit } from "@actions/global/getLimits";

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
      const { workSpaceLimit } = await getLimits();

      if (!(workSpaceLimit < MAX_FREE_lIMIT_COUNT.workspace)) {
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

    if (!isPro) {
      await increaseLimit("workspace");
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

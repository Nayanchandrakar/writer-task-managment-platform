"use server";

import { formSchema, formSchemaType } from "./schema";
import { auth } from "@clerk/nextjs";
import { handlerOutputType } from "./types";
import { actionHandler } from "../../../types/action-types";
import prismadb from "@lib/prismadb";
import { revalidatePath } from "next/cache";
import { getSubscription } from "@actions/subscription/get";
import { MAX_FREE_lIMIT_COUNT } from "@constants";
import { getLimits, increaseLimit } from "@actions/global/getLimits";
import { createAuditLog } from "@actions/audit/createAuditLog";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized user!",
      };
    }

    const { noteTitle, workSpaceId } = req;

    const { isPro } = await getSubscription();

    if (!isPro) {
      const { noteLimit } = await getLimits();

      if (!(noteLimit < MAX_FREE_lIMIT_COUNT.notes)) {
        return {
          error: "304",
        };
      }
    }

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

    if (!isPro) {
      await increaseLimit("note");
    }

    await createAuditLog({
      entitOperation: "CREATE",
      entityId: createNotes?.id,
      entityTitle: createNotes?.noteTitle,
      entityType: "NOTE",
    });

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

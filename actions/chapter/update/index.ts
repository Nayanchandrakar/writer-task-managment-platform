"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import prismadb from "@/lib/prismadb";

import { actionHandler } from "@/types/action-types";
import { createAuditLog } from "@/actions/audit/createAuditLog";

import { handlerOutputType } from "./type";
import { formSchema, formSchemaType } from "./schema";

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

    await createAuditLog({
      entitOperation: "UPDATE",
      entityId: updateChapter?.id,
      entityTitle: updateChapter?.title,
      entityType: "CHAPTER",
    });

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

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

    await createAuditLog({
      entitOperation: "DELETE",
      entityId: deleteChapter?.id,
      entityTitle: deleteChapter?.title,
      entityType: "CHAPTER",
    });

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

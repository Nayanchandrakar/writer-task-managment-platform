"use server";

import { auth } from "@clerk/nextjs";
import { actionHandler } from "../../../types/action-types";
import { formSchemaType, formSchema } from "./schema";
import { handlerOutputType } from "./type";
import prismadb from "../../../lib/prismadb";
import { revalidatePath } from "next/cache";
import { createAuditLog } from "@actions/audit/createAuditLog";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }

    const { topicId } = req;

    const topicExist = await prismadb?.topic?.findFirst({
      where: {
        id: topicId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!topicExist) {
      return {
        error: "topic not exists!",
      };
    }

    const deleteTopic = await prismadb?.topic?.delete({
      where: {
        id: topicId,
        userId,
      },
    });

    if (!deleteTopic) {
      return {
        error: "database error occured!",
      };
    }

    await createAuditLog({
      entitOperation: "DELETE",
      entityId: deleteTopic?.id,
      entityTitle: deleteTopic?.name,
      entityType: "TOPIC",
    });

    revalidatePath(`/chapter/${deleteTopic?.chapterId}`);

    return {
      data: deleteTopic,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const deleteTopic = actionHandler(formSchema, handler);

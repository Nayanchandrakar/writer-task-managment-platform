"use server";

import { auth } from "@clerk/nextjs";
import { actionHandler } from "@/types/action-types";
import { formSchemaType, formSchema } from "./schema";
import { handlerOutputType } from "./type";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { createAuditLog } from "@/actions/audit/createAuditLog";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }

    const { title, topicId } = req;

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

    const updateTopic = await prismadb?.topic?.update({
      where: {
        id: topicId,
        userId,
      },
      data: {
        name: title,
      },
    });

    if (!updateTopic) {
      return {
        error: "database error occured!",
      };
    }

    await createAuditLog({
      entitOperation: "UPDATE",
      entityTitle: updateTopic?.name,
      entityType: "TOPIC",
      entityId: updateTopic?.id,
    });

    revalidatePath(`/chapter/${updateTopic?.chapterId}`);

    return {
      data: updateTopic,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const updateTopic = actionHandler(formSchema, handler);

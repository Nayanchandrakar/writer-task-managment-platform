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

    const { subTopicId } = req;

    const topicExist = await prismadb?.subTopic?.findFirst({
      where: {
        id: subTopicId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!topicExist) {
      return {
        error: "subtopic not exists!",
      };
    }

    const deleteTopic = await prismadb?.subTopic?.delete({
      where: {
        id: topicExist?.id,
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
      entityTitle: deleteTopic?.title,
      entityType: "SUBTOPIC",
      entityId: deleteTopic?.topicId!,
    });

    revalidatePath(`/chapter`);

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

export const deleteSubTopic = actionHandler(formSchema, handler);

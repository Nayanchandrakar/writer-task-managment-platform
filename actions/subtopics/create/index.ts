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

    const { title, topicId } = req;

    const topic = await prismadb?.topic?.findFirst({
      where: {
        id: topicId,
      },
      select: {
        id: true,
      },
    });

    if (!topic) {
      return {
        error: "invalid topic id",
      };
    }

    const subTopic = await prismadb?.subTopic?.findFirst({
      where: {
        userId,
        topicId: topic?.id,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const position = subTopic?.position ? subTopic?.position + 1 : 0;

    const createSubTopic = await prismadb?.subTopic?.create({
      data: {
        title,
        userId,
        topicId: topic?.id,
        position,
      },
    });

    revalidatePath(`/chapter/${topic?.id}`);

    await createAuditLog({
      entitOperation: "CREATE",
      entityId: createSubTopic?.id,
      entityTitle: createSubTopic?.title,
      entityType: "SUBTOPIC",
    });

    return {
      data: createSubTopic,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const createSubTopic = actionHandler(formSchema, handler);

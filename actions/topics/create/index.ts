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

    const { title, chapterId } = req;

    const chapter = await prismadb?.chapter?.findFirst({
      where: {
        id: chapterId,
      },
      select: {
        id: true,
      },
    });

    if (!chapter) {
      return {
        error: "invalid chapter id",
      };
    }

    const topic = await prismadb?.topic?.findFirst({
      where: {
        userId,
        chapterId: chapter?.id,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const position = topic?.position ? topic?.position + 1 : 0;

    const createTopic = await prismadb?.topic?.create({
      data: {
        name: title,
        userId,
        chapterId: chapter?.id,
        position,
      },
    });

    await createAuditLog({
      entitOperation: "CREATE",
      entityTitle: createTopic?.name,
      entityType: "TOPIC",
      entityId: createTopic?.id,
    });

    revalidatePath(`/chapter/${chapter?.id}`);

    return {
      data: createTopic,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const createTopic = actionHandler(formSchema, handler);

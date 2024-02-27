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

    const { subTopicId, description } = req;

    const subTopic = await prismadb?.subTopic?.findFirst({
      where: {
        id: subTopicId,
      },
      select: {
        id: true,
      },
    });

    if (!subTopic) {
      return {
        error: "invalid subTopic id",
      };
    }

    const updateSubTopic = await prismadb?.subTopic?.update({
      where: {
        id: subTopic?.id,
        userId,
      },
      data: {
        description: description || "",
      },
    });

    await createAuditLog({
      entitOperation: "UPDATE",
      entityId: updateSubTopic?.id!,
      entityTitle: updateSubTopic?.title,
      entityType: "SUBTOPIC",
    });

    revalidatePath(`/chapter`);

    return {
      data: updateSubTopic,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const updateSubTopic = actionHandler(formSchema, handler);

"use server";

import { auth } from "@clerk/nextjs";
import { actionHandler } from "../../../types/action-types";
import { formSchemaType, formSchema } from "./schema";
import { handlerOutputType } from "./type";
import prismadb from "../../../lib/prismadb";
import { revalidatePath } from "next/cache";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }

    const { subTopicId } = req;

    const subTopicExist = await prismadb?.subTopic?.findFirst({
      where: {
        id: subTopicId,
        userId,
      },
      select: {
        id: true,
        title: true,
        topicId: true,
      },
    });

    if (!subTopicExist) {
      return {
        error: "no sub-topic exists!",
      };
    }

    const lastSubTopic = await prismadb?.topic?.findFirst({
      where: {
        id: subTopicExist?.id,
        userId,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const position = lastSubTopic?.position ? lastSubTopic?.position + 1 : 0;

    const copyiedSubTopic = await prismadb?.subTopic?.create({
      data: {
        title: `${subTopicExist?.title} - Copy`,
        position,
        userId,
        topicId: subTopicExist?.topicId,
      },
    });

    if (!copyiedSubTopic) {
      return {
        error: "database error occured!",
      };
    }

    revalidatePath(`/chapter`);

    return {
      data: copyiedSubTopic,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const copySubTopic = actionHandler(formSchema, handler);

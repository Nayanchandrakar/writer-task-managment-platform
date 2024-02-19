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

    const { topicId } = req;

    const topicExist = await prismadb?.topic?.findFirst({
      where: {
        id: topicId,
        userId,
      },
      select: {
        id: true,
        name: true,
        chapterId: true,
      },
    });

    if (!topicExist) {
      return {
        error: "no topic exists!",
      };
    }

    const lastTopic = await prismadb?.topic?.findFirst({
      where: {
        id: topicExist?.id,
        userId,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const position = lastTopic?.position ? lastTopic?.position + 1 : 0;

    const allSubTopics = await prismadb?.subTopic?.findMany({
      where: {
        userId,
        topicId: topicExist?.id,
      },
      select: {
        title: true,
        description: true,
        position: true,
      },
    });

    const copyTopicCreate = await prismadb?.topic?.create({
      data: {
        name: `${topicExist?.name} - Copy`,
        position,
        userId,
        chapterId: topicExist?.chapterId,
      },
    });

    if (!copyTopicCreate) {
      return {
        error: "database error occured!",
      };
    }

    const hasData = !!(allSubTopics?.length === 0);

    if (!hasData) {
      const SubTopics = allSubTopics?.map((data) => ({
        ...data,
        userId,
        topicId: copyTopicCreate?.id,
      }));

      const subTopicsCreate = await prismadb?.subTopic?.createMany({
        data: SubTopics,
      });
    }

    revalidatePath(`/chapter/${topicExist?.chapterId}`);

    return {
      data: copyTopicCreate,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const copyTopics = actionHandler(formSchema, handler);

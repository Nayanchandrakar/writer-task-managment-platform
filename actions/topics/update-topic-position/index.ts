"use server";

import { auth } from "@clerk/nextjs";
import { actionHandler } from "@/types/action-types";
import { formSchemaType, formSchema } from "./schema";
import { handlerOutputType } from "./type";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "unauthorized user!",
      };
    }

    const { chapterId, topics } = req;

    const transaction = topics?.map((data) =>
      prismadb.topic?.update({
        where: {
          id: data?.id,
          userId,
        },
        data: {
          position: data?.position,
        },
      })
    );

    const updateTransaction = await prismadb?.$transaction(transaction);

    revalidatePath(`/chapter/${chapterId}`);

    return {
      data: updateTransaction,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server error",
    };
  }
};

export const updateTopicPosition = actionHandler(formSchema, handler);

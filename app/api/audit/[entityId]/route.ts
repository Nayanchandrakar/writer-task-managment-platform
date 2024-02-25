import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      entityId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("unauthorized user!s", { status: 401 });
    }

    const { entityId } = params;

    if (!entityId) {
      return new Response("please provide an entity id");
    }

    const isValidID = await prismadb?.topic?.findFirst({
      where: {
        userId,
        id: entityId,
      },
    });

    if (!isValidID) {
      return new Response("No topic exist with this id", { status: 404 });
    }

    const AuditLogData = await prismadb?.activityLog?.findMany({
      where: {
        userId,
        entityId,
        entityType: "SUBTOPIC",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(AuditLogData);
  } catch (error) {
    return new Response("Internal server error!", { status: 500 });
  }
};

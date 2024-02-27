import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
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

    const user = await currentUser();

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

    const data = AuditLogData?.map((audit) => ({
      ...audit,
      firstName: user?.firstName,
      lastName: user?.lastName,
      imageUrl: user?.imageUrl,
    }));

    return NextResponse.json(data);
  } catch (error) {
    return new Response("Internal server error!", { status: 500 });
  }
};

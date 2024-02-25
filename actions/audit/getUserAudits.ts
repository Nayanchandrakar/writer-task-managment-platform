import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { ActivityLog } from "@prisma/client";

let AuditLogs: ActivityLog[] = [
  {
    createdAt: new Date(),
    entitOperation: "CREATE",
    entityId: "",
    entityTitle: "",
    entityType: "CHAPTER",
    id: "",
    updatedAt: new Date(),
    userId: "",
  },
];

export const getUserAudits = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return AuditLogs;
    }

    AuditLogs = await prismadb?.activityLog?.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return AuditLogs;
  } catch (error) {
    return AuditLogs;
  }
};

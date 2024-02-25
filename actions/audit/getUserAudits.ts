import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { AuditLogCustom } from "../../types/types";

let AuditLogs: AuditLogCustom[] = [
  {
    createdAt: new Date(),
    entitOperation: "CREATE",
    entityId: "",
    entityTitle: "",
    entityType: "CHAPTER",
    id: "",
    updatedAt: new Date(),
    userId: "",
    firstName: "",
    lastName: "",
    imageUrl: "",
  },
];

export const getUserAudits = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return AuditLogs;
    }

    const user = await currentUser();

    const activities = await prismadb?.activityLog?.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    const data = activities?.map((audit) => ({
      ...audit,
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      imageUrl: user?.imageUrl!,
    }));

    return data;
  } catch (error) {
    return AuditLogs;
  }
};

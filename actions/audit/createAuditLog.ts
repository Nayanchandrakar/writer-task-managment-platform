import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { ACTIVITY_OPERATIONS, ACTIVITY_TYPES } from "@prisma/client";

interface createAuditLogInterface {
  entityType: ACTIVITY_TYPES;
  entitOperation: ACTIVITY_OPERATIONS;
  entityTitle: string;
  entityId: string;
}

export const createAuditLog = async ({
  entitOperation,
  entityTitle,
  entityType,
  entityId,
}: createAuditLogInterface) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return false;
    }

    if (!entitOperation || !entityTitle || !entityType || !entityId) {
      return false;
    }

    const createLog = await prismadb?.activityLog?.create({
      data: {
        entitOperation,
        entityTitle,
        entityType,
        userId,
        entityId,
      },
    });

    if (!createLog) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("error occured from activity Log");
    return false;
  }
};

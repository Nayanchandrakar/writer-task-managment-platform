import { User } from "@clerk/nextjs/server";
import { ActivityLog } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import dayjs from "dayjs";

interface AuditDataProps {
  logs: ActivityLog;
  user: Pick<User, "firstName" | "lastName" | "imageUrl"> | undefined | null;
}

const AuditData: FC<AuditDataProps> = ({ logs, user }) => {
  const createdAt = dayjs(logs?.createdAt).toString();

  return (
    <div className="flex gap-x-3 items-center">
      <Image
        width={100}
        height={100}
        sizes="100vw"
        alt="profile-image"
        src={user?.imageUrl!}
        className="size-9 aspect-square rounded-full"
      />
      <div className="flex flex-col gap-y-0.5 items-start">
        <p className="lowercase text-zinc-500 text-sm font-normal">
          <span className="font-bold text-black">
            {user?.firstName} {user?.lastName}
          </span>
          {logs?.entitOperation} {logs?.entityType} &ldquo;{logs?.entityTitle}
          &rdquo;
        </p>

        <p className="text-xs font-normal text-zinc-500">{createdAt}</p>
      </div>
    </div>
  );
};

export default AuditData;

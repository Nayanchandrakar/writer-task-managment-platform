"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { AuditLogCustom } from "../../types/types";

interface AuditDataProps {
  logs: AuditLogCustom;
}

const AuditData = ({ logs }: AuditDataProps) => {
  const createdAt = dayjs(logs?.createdAt).toString();

  return (
    <div className="flex gap-x-3 items-center">
      <Image
        width={100}
        height={100}
        sizes="100vw"
        alt="profile-image"
        src={logs?.imageUrl!}
        className="size-9 aspect-square rounded-full"
      />
      <div className="flex flex-col gap-y-0.5 items-start">
        <p className="lowercase text-zinc-500 text-sm font-normal">
          <span className="font-bold text-black">
            {logs?.firstName} {logs?.lastName}
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

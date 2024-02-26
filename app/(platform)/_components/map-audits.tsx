"use client";
import AuditData from "@components/global/audit-data";
import { AuditLogCustom } from "../../../types/types";
import { FC, useState, useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import getUserAuditClient from "@actions/audit/getUserAuditClient";

interface MapAuditsProps {
  logs: AuditLogCustom[];
}

let take = 1;

const MapAudits: FC<MapAuditsProps> = ({ logs }) => {
  const [data, setData] = useState<AuditLogCustom[]>(logs);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchActions = async () => {
      const res = await getUserAuditClient(take);

      if (res) {
        setData((prev) => [...prev, ...res]);
      }
      take++;
    };

    if (isIntersecting) {
      fetchActions();
    }
  }, [isIntersecting]);

  return (
    <div className="space-y-4 mt-8 overflow-y-scroll h-[15rem]">
      {data?.map((audit) => (
        <AuditData key={audit?.id} logs={audit} />
      ))}
      <div ref={ref} className="">
        loading.............
      </div>
    </div>
  );
};

export default MapAudits;

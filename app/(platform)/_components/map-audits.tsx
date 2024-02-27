"use client";
import AuditData from "@components/global/audit-data";
import { AuditLogCustom } from "../../../types/types";
import { useState, useCallback } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import getUserAuditClient from "@actions/audit/getUserAuditClient";
import AuditSkeleton from "@components/global/user-audit-skeleton";

const MapAudits = () => {
  const [data, setData] = useState<AuditLogCustom[] | []>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [activityLoaded, setActivityLoaded] = useState<number>(0);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange: () => {
      if (isIntersecting) {
        fetchActions();
      }
    },
  });

  const fetchActions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getUserAuditClient(activityLoaded);

      if (res && res?.length !== 0) {
        setData((prev) => [...prev, ...res]);
        setActivityLoaded(activityLoaded + 4);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [activityLoaded]);

  return (
    <div
      className="space-y-4 mt-8 overflow-y-scroll h-[13rem] "
      id="custom_scrollbar"
    >
      {data?.map((audit) => (
        <AuditData key={audit?.id} logs={audit} />
      ))}
      <div className="space-y-4" ref={ref}>
        {IsLoading &&
          Array.from({
            length: 2,
          })?.map((e, index) => <AuditSkeleton key={index} />)}
      </div>
    </div>
  );
};

export default MapAudits;

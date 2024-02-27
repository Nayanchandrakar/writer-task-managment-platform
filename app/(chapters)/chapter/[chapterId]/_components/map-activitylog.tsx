"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import AuditData from "@/components/global/audit-data";
import AuditSkeleton from "@/components/global/user-audit-skeleton";
import { AuditLogCustom } from "../../../../../types/types";

interface MapAcitivitiesProps {
  entityId: string;
}

const MapAcitivities = ({ entityId }: MapAcitivitiesProps) => {
  const [data, setData] = useState<AuditLogCustom[]>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);

  const trial = [2, 2];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/audit/${entityId}`);

        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [entityId]);

  return (
    <div className="mt-2 space-y-4">
      {IsLoading
        ? trial?.map((e, index) => <AuditSkeleton key={index + 33} />)
        : data?.map((logs: AuditLogCustom) => (
            <AuditData key={logs?.id} logs={logs} />
          ))}
    </div>
  );
};

export default MapAcitivities;

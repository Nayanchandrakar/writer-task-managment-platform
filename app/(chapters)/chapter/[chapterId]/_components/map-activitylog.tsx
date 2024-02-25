"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { ActivityLog } from "@prisma/client";
import AuditData from "@components/global/audit-data";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@components/ui/skeleton";

interface MapAcitivitiesProps {
  entityId: string;
}

const MapAcitivities = ({ entityId }: MapAcitivitiesProps) => {
  const [data, setData] = useState<ActivityLog[]>([]);
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
  }, []);

  const { user } = useUser();

  return (
    <div className="mt-2 space-y-4">
      {!IsLoading &&
        data?.map((logs: ActivityLog) => (
          <AuditData user={user} key={logs?.id} logs={logs} />
        ))}

      {IsLoading &&
        trial?.map((e) => (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MapAcitivities;

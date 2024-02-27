import { Skeleton } from "@/components/ui/skeleton";

const AuditSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-9 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[200px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
    </div>
  );
};

export default AuditSkeleton;

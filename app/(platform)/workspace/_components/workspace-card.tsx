import { FC } from "react";

interface WorkSpaceCardProps {
  label: string;
  counts: number;
}

const WorkSpaceCard: FC<WorkSpaceCardProps> = ({ label, counts }) => {
  return (
    <div className="w-full h-28 p-5 rounded-lg border border-zinc-200 flex  justify-between flex-col">
      <p className="font-bold text-sm ">{label}</p>
      <span className="text-2xl font-semibold ">{counts}+</span>
    </div>
  );
};

export default WorkSpaceCard;

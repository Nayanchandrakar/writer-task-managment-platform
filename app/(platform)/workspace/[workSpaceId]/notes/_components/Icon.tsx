import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface IconProps {
  Icon: LucideIcon;
  className?: string;
}

const Icon: FC<IconProps> = ({ Icon, className }) => {
  return (
    <div
      className={cn(
        "size-16 flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-pink-600  rounded-lg",
        className
      )}
    >
      <Icon className="size-8 text-white" />
    </div>
  );
};

export default Icon;

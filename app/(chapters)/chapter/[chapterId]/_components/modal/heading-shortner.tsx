import { cn } from "@lib/utils";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface HeadingShortnerProps {
  Icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const HeadingShortner: FC<HeadingShortnerProps> = ({
  Icon,
  children,
  title,
  className,
}) => {
  return (
    <div className={cn("flex  gap-x-4 items-start", className)}>
      <Icon className="size-6 text-slate-700 mt-0.5" />

      <div className="flex flex-col gap-y-2 w-full h-full">
        <span className="text-lg  font-semibold first-letter:uppercase">
          {title}
        </span>
        {children}
      </div>
    </div>
  );
};

export default HeadingShortner;

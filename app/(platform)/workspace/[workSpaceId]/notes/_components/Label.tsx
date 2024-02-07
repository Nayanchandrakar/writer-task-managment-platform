import { LucideIcon, Plus } from "lucide-react";
import { FC } from "react";
import Icon from "./Icon";

interface LabelProps {
  LabelIcon: LucideIcon;
  name: string;
  isPro: boolean;
}

const Label: FC<LabelProps> = ({ LabelIcon, name, isPro }) => {
  return (
    <div className="flex items-center justify-start space-x-4  border-b pb-4 border-zinc-200">
      <Icon Icon={LabelIcon} />
      <div className="flex flex-col space-y-1">
        <h2 className="font-medium first-letter:uppercase text-base ">
          {name}
        </h2>
        <div className="flex space-x-1 text-gray-400 font-semibold text-sm items-center">
          <Plus className="w-4 h-4 " />
          <span>{isPro ? "Pro" : "Free"}</span>
        </div>
      </div>
    </div>
  );
};

export default Label;

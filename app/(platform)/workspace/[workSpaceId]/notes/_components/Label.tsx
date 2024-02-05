import { LucideIcon } from "lucide-react";
import { FC } from "react";
import Icon from "./Icon";

interface LabelProps {
  LabelIcon: LucideIcon;
  name: string;
  description?: string;
}

const Label: FC<LabelProps> = ({ LabelIcon, name, description }) => {
  return (
    <div className="flex items-center justify-start space-x-4  border-b pb-4 border-zinc-200">
      <Icon Icon={LabelIcon} />
      <div className="flex flex-col space-y-1">
        <h2 className="font-medium first-letter:uppercase text-base ">
          {name}
        </h2>
        {description && (
          <p className="text-sm  font-normal text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Label;

import { SubTopic } from "@prisma/client";
import { FC } from "react";

interface CardProps {
  subTopic: SubTopic;
}

const Card: FC<CardProps> = ({ subTopic }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-md hover:bg-white/70 transition-colors duration-200 p-3 cursor-pointer">
      <span className="text-black font-semibold text-sm first-letter:uppercase">
        {subTopic?.title}
      </span>
    </div>
  );
};

export default Card;

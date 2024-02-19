"use client";
import { Draggable } from "@hello-pangea/dnd";
import { SubTopic } from "@prisma/client";
import { FC } from "react";

interface CardProps {
  subTopic: SubTopic;
  index: number;
}

const Card: FC<CardProps> = ({ subTopic, index }) => {
  return (
    <Draggable draggableId={subTopic?.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="bg-white/80 backdrop-blur-md rounded-md hover:bg-white/70 transition-colors duration-200 p-3 cursor-pointer h-fit w-full "
        >
          <span className="text-black font-medium text-sm first-letter:uppercase">
            {subTopic?.title}
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Card;

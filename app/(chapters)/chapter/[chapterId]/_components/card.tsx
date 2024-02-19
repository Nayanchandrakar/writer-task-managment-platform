"use client";
import { Draggable } from "@hello-pangea/dnd";
import { useSubTopicToogleModal } from "@hooks/use-subtopic-toogle-modal";
import { SubTopic } from "@prisma/client";
import { FC } from "react";
import SubTopicToogleModal from "./modal/subtopic-toogle-modal";

interface CardProps {
  subTopic: SubTopic;
  topicName: string;
  index: number;
}

const Card: FC<CardProps> = ({ subTopic, index, topicName }) => {
  const toogleSubTopicModal = useSubTopicToogleModal();

  return (
    <>
      <Draggable draggableId={subTopic?.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => toogleSubTopicModal.onOpen(subTopic?.id)}
            className="bg-white/80 backdrop-blur-md rounded-md hover:bg-white/70 transition-colors duration-200 p-3 cursor-pointer h-fit w-full "
          >
            <span className="text-black font-medium text-sm first-letter:uppercase">
              {subTopic?.title}
            </span>
          </div>
        )}
      </Draggable>
      <SubTopicToogleModal topicName={topicName} data={subTopic} />
    </>
  );
};

export default Card;

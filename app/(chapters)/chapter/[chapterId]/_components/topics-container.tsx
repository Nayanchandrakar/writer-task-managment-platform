"use client";

import { FC } from "react";
import CreateSubTopicForm from "./create-subtopic-form";
import Card from "./card";
import TopicTitleUpdateForm from "./topic-title-update-form";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TopicWithSubTopics } from "../../../../../types/types";

interface TopicsContainerProps {
  data: TopicWithSubTopics;
  index: number;
}

const TopicsContainer: FC<TopicsContainerProps> = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-full h-full max-w-[280px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="bg-white/50 backdrop-blur-sm p-3   rounded-md shadow-md shadow-black/10 "
          >
            {/* topic title update form  */}
            <TopicTitleUpdateForm data={data} />

            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="py-3 flex flex-col gap-y-4 "
                >
                  {data?.SubTopic?.map((subTopicOutput, index) => {
                    return (
                      <Card
                        topicName={data?.name}
                        key={subTopicOutput?.id}
                        index={index}
                        subTopic={subTopicOutput}
                      />
                    );
                  })}

                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            {/* create subtopic form  */}
            <CreateSubTopicForm topicId={data?.id} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TopicsContainer;

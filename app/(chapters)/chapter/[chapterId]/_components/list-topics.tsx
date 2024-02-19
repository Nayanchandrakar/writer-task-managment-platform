"use client";

import { useEffect, useState } from "react";
import CreateTopicForm from "./create-topic-form";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TopicsContainer from "./topics-container";
import { TopicWithSubTopics } from "../../../../../types/types";
import { useAction } from "@hooks/useAction";
import { updateSubTopicPosition } from "@actions/topics/update-subTopic-position";
import { updateTopicPosition } from "@actions/topics/update-topic-position";
import { toast } from "sonner";

interface ListTopicsProps {
  topics: TopicWithSubTopics[];
  chapterId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListTopics = ({ chapterId, topics }: ListTopicsProps) => {
  const [orderedData, setOrderedData] = useState(topics);

  const { execute: executeTopicPositionUpdate } = useAction(
    updateTopicPosition,
    {
      onSuccess: () => {
        toast.success("topic reordered");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeSubTopicPositionUpdate } = useAction(
    updateSubTopicPosition,
    {
      onSuccess: () => {
        toast.success("subTopic reordered");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  useEffect(() => {
    setOrderedData(topics);
  }, [topics]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          chapterId: item?.chapterId!,
          position: index,
        })
      );

      setOrderedData(items);
      executeTopicPositionUpdate({ topics: items!, chapterId });
    }

    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.SubTopic) {
        sourceList.SubTopic = [];
      }

      if (!destList.SubTopic) {
        destList.SubTopic = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.SubTopic,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.position = idx;
        });

        sourceList.SubTopic = reorderedCards;

        setOrderedData(newOrderedData);
        executeSubTopicPositionUpdate({
          chapterId,
          subTopics: reorderedCards,
        });
      } else {
        const [movedCard] = sourceList.SubTopic.splice(source.index, 1);

        movedCard.topicId = destination.droppableId;

        destList.SubTopic.splice(destination.index, 0, movedCard);

        sourceList.SubTopic.forEach((card, idx) => {
          card.position = idx;
        });

        destList.SubTopic.forEach((SubTopic, idx) => {
          SubTopic.position = idx;
        });

        setOrderedData(newOrderedData);
        executeSubTopicPositionUpdate({
          chapterId,
          subTopics: destList.SubTopic,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 h-fit"
          >
            {orderedData?.map((data, index) => (
              <TopicsContainer index={index} data={data} />
            ))}

            {provided.placeholder}
            <CreateTopicForm chapterId={chapterId} />
            <div className="flex-shrink-0 w-1" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListTopics;

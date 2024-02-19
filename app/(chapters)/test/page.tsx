"use client";
import Container from "@components/ui/shared/container";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const TestPage = () => {
  const [item, setItem] = useState([
    { id: 34534, content: "aryan" },
    { id: 856785, content: "hellow" },
    { id: 454345, content: "umesh" },
  ]);

  const onDragEnd = () => {
    console.log("hellada");
  };

  return (
    <Container className="py-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="grid grid-cols-5 space-x-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {item.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`${item.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-slate-600"
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default TestPage;

"use client";

import { Button, buttonVariants } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { cn } from "@lib/utils";
import { Plus, X } from "lucide-react";
import { ElementRef, FC, useRef, useState } from "react";

interface CreateTopicFormProps {}

const CreateTopicForm: FC<CreateTopicFormProps> = ({}) => {
  const [IsEditing, setIsEditing] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const handleEditing = () => {
    setIsEditing(true);
    inputRef?.current?.focus();
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <form
      id="form_submit"
      className={cn(
        "flex justify-start items-center w-full h-fit  rounded-md space-x-2 ",
        IsEditing && "bg-white p-3"
      )}
    >
      {IsEditing ? (
        <div className="">
          <Input
            ref={inputRef}
            id="topicName"
            name="topicName"
            required
            className="w-full h-8  rounded-md  "
            placeholder="Enter topic name..."
          />
          <div className="flex items-center mt-3 space-x-2">
            <Button
              id="form_submit"
              type="submit"
              className="bg-sky-700 hover:bg-sky-700/90 text-white"
              size="sm"
            >
              Add topic
            </Button>
            <span
              onClick={disableEditing}
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })
              )}
            >
              <X className="size-4" />
            </span>
          </div>
        </div>
      ) : (
        <span
          className=" w-full h-full hover:bg-white/40 bg-white/70 flex items-center space-x-2 p-3 rounded-md text-neutral-700 transition-colors duration-200   cursor-pointer"
          onClick={handleEditing}
        >
          <Plus className="size-4" />
          <span className="text-sm font-medium">Add Topic</span>
        </span>
      )}
    </form>
  );
};

export default CreateTopicForm;

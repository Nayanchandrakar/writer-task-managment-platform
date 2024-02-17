"use client";

import { createSubTopic } from "@actions/subtopics/create";
import FieldErrors from "@components/global/field-errors";
import { Button, buttonVariants } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { useAction } from "@hooks/useAction";
import { cn } from "@lib/utils";
import { Plus, X } from "lucide-react";
import { ElementRef, FC, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CreateSubTopicFormProps {
  topicId: string;
}

const CreateSubTopicForm: FC<CreateSubTopicFormProps> = ({ topicId }) => {
  const [IsEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e?.key === "Escape") {
      disableEditing();
    }
  };

  const { fieldErrors, isLoading, execute } = useAction(createSubTopic, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.title} is begin created!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData?.get("title") as string;
    execute({
      title,
      topicId,
    });
  };

  return (
    <form id="form_submit" ref={formRef} action={onSubmit}>
      {IsEditing ? (
        <div className="">
          <Textarea
            id="title"
            name="title"
            disabled={isLoading}
            required
            className="w-full rounded-md focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Enter Subtopic title..."
          />
          <div className="flex items-center mt-3 space-x-2">
            <Button
              id="form_submit"
              type="submit"
              disabled={isLoading}
              className="bg-sky-700 hover:bg-sky-700/90 text-white"
              size="sm"
            >
              Add Subtopic
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

          <FieldErrors id="title" error={fieldErrors} />
        </div>
      ) : (
        <span
          className=" w-full h-full  flex items-center space-x-2  text-neutral-500 transition-colors duration-200  hover:text-neutral-600  cursor-pointer"
          onClick={handleEditing}
        >
          <Plus className="size-4" />
          <span className="text-sm font-medium">Add a Subtopic</span>
        </span>
      )}
    </form>
  );
};

export default CreateSubTopicForm;

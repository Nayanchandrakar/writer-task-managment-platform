"use client";

import { createTopic } from "@/actions/topics/create";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/useAction";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { ElementRef, FC, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CreateTopicFormProps {
  chapterId: string;
}

const CreateTopicForm: FC<CreateTopicFormProps> = ({ chapterId }) => {
  const [IsEditing, setIsEditing] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const handleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e?.key === "Escape") {
      disableEditing();
    }
  };

  const { isLoading, execute } = useAction(createTopic, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.name} is begin created!`);
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
      chapterId,
    });
  };

  return (
    <form
      id="form_submit"
      ref={formRef}
      action={onSubmit}
      className={cn(
        "flex justify-start items-center   w-full h-fit  rounded-md space-x-2 ",
        IsEditing && "bg-white p-3"
      )}
    >
      {IsEditing ? (
        <div className="w-full">
          <Input
            ref={inputRef}
            id="title"
            name="title"
            disabled={isLoading}
            required
            className="w-full h-8  rounded-md  "
            placeholder="Enter topic name..."
          />
          <div className="flex items-center mt-3 space-x-2">
            <Button
              id="form_submit"
              type="submit"
              disabled={isLoading}
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
          className=" w-full h-full bg-zinc-200 flex items-center space-x-2 p-3 rounded-md text-neutral-700 transition-colors duration-200   cursor-pointer"
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

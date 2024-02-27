"use client";

import { updateTopic } from "@/actions/topics/update";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/useAction";
import { ElementRef, FC, KeyboardEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface TopicUpdateFormProps {
  topicName: string;
  topicId: string;
}

const TopicUpdateForm: FC<TopicUpdateFormProps> = ({ topicId, topicName }) => {
  const [IsEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const { isLoading, execute } = useAction(updateTopic, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.name} is begin updated!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onsubmit = (formData: FormData) => {
    const title = formData?.get("title") as string;
    execute({
      title,
      topicId,
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e?.key === "Escape") {
      disableEditing();
    }
  };

  //   @ts-ignore
  useEventListener("keydown", onKeyDown);

  useOnClickOutside(formRef, disableEditing);

  if (IsEditing) {
    return (
      <form ref={formRef} action={onsubmit}>
        <Input
          className="bg-transparent outline-none border-none focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0 h-0 font-semibold  text-sm  px-0 py-2.5"
          ref={inputRef}
          id="title"
          name="title"
          defaultValue={topicName}
          required
          type="text"
          disabled={isLoading}
        />
      </form>
    );
  }

  return (
    <span
      onClick={() => handleEditing()}
      className="font-semibold first-letter:uppercase  text-sm cursor-pointer"
    >
      {topicName}
    </span>
  );
};

export default TopicUpdateForm;

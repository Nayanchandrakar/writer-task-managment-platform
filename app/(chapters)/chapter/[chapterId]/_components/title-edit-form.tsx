"use client";

import { updateChapter } from "@actions/chapter/update";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useAction } from "@hooks/useAction";
import { ElementRef, FC, useRef, useState } from "react";
import { toast } from "sonner";

interface TitleEditFormProps {
  chapterTitle: string;
  chapterId: string;
  noteId: string;
}

const TitleEditForm: FC<TitleEditFormProps> = ({
  chapterId,
  chapterTitle,
  noteId,
}) => {
  const [IsEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(chapterTitle);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, error, isLoading } = useAction(updateChapter, {
    onSuccess: (data) => {
      setTitle(data?.title);
      toast.success(`chapter ${data?.title} is begin updated!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onBlur = () => {
    formRef?.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData?.get("title") as string;
    execute({
      chapterId,
      title,
    });
  };

  if (IsEditing) {
    return (
      <form ref={formRef} action={onSubmit}>
        <Input
          className="bg-transparent outline-none border-none focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
          onBlur={() => onBlur()}
          ref={inputRef}
          id="title"
          name="title"
          defaultValue={title}
          required
          type="text"
          disabled={isLoading}
        />
      </form>
    );
  } else {
    return (
      <Button
        variant="ghost"
        disabled={isLoading}
        className="hover:bg-white/10 hover:text-white"
        onClick={() => enableEditing()}
      >
        {chapterTitle}
      </Button>
    );
  }
};

export default TitleEditForm;

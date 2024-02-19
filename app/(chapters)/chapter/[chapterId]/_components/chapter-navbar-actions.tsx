"use client";
import { FC } from "react";
import { toast } from "sonner";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import ToogleMenu from "@components/global/toogle-menu";
import { deleteChapter } from "@actions/chapter/delete";
import { useAction } from "@hooks/useAction";

interface ChapterNavbarActionsProps {
  chapterId: string;
}

const ChapterNavbarActions: FC<ChapterNavbarActionsProps> = ({ chapterId }) => {
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteChapter, {
    onSuccess: (data) => {
      toast.success(`chapter ${data?.title} deleted succefully!`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => {
      router?.push("/workspace");
    },
  });

  const handleDelete = () => {
    if (!chapterId) null;
    execute({
      chapterId,
    });
  };

  return (
    <ToogleMenu
      actionName="chapter actions"
      ToogleButton={<MoreVertical className="size-5 cursor-pointer" />}
    >
      <div
        className="w-full cursor-pointer h-fit p-2 text-sm rounded-md transition-colors duration-200 hover:bg-slate-100 disabled:opacity-90"
        onClick={() => handleDelete()}
      >
        delete chapter
      </div>
    </ToogleMenu>
  );
};

export default ChapterNavbarActions;

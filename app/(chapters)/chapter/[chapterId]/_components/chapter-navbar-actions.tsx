"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useAction } from "@hooks/useAction";
import { deleteChapter } from "@actions/chapter/delete";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hover:bg-white/10 transition-colors duration-200 p-2 rounded-md">
        <MoreVertical className="size-5 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 mt-6">
        <DropdownMenuLabel>chapter actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoading}
          onClick={() => handleDelete()}
          className={`cursor-pointer disabled:opacity-90`}
        >
          delete chapter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChapterNavbarActions;

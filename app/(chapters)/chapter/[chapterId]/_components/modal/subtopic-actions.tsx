"use client";

import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";

import { copySubTopic } from "@actions/topics/copy-subtopics";
import { deleteSubTopic } from "@actions/topics/delete-subtopic";
import { Button } from "@components/ui/button";
import { useSubTopicToogleModal } from "@hooks/use-subtopic-toogle-modal";
import { useAction } from "@hooks/useAction";

const SubTopicActions = ({}) => {
  const subTopic = useSubTopicToogleModal();

  const copyAction = useAction(copySubTopic, {
    onSuccess: (data) => {
      toast.success(`subtopic ${data?.title}`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => subTopic?.onClose(),
  });

  const deleteAction = useAction(deleteSubTopic, {
    onSuccess: (data) => {
      toast.success(`subtopic ${data?.title}`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => subTopic?.onClose(),
  });

  return (
    <div className="flex flex-col gap-y-2 w-[40%]">
      <span className="font-semibold text-sm ">Actions</span>
      <Button
        size="sm"
        disabled={copyAction?.isLoading}
        onClick={() =>
          copyAction?.execute({ subTopicId: subTopic?.subTopicId! })
        }
        className="bg-zinc-100 hover:bg-zinc-200 w-full justify-start"
        variant="ghost"
      >
        <Copy className="size-4 mr-2" />
        Copy
      </Button>

      <Button
        size="sm"
        disabled={deleteAction?.isLoading}
        onClick={() =>
          deleteAction?.execute({ subTopicId: subTopic?.subTopicId! })
        }
        className="bg-zinc-100 hover:bg-zinc-200 w-full justify-start"
        variant="ghost"
      >
        <Trash className="size-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default SubTopicActions;

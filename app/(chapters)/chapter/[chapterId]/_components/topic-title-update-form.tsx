"use client";

import { FC } from "react";
import ToogleMenu from "@/components/global/toogle-menu";
import { Topic } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useAction } from "@/hooks/useAction";
import { deleteTopic } from "@/actions/topics/delete";
import { toast } from "sonner";
import { copyTopics } from "@/actions/topics/copy-topics";
import TopicUpdateForm from "./topic-update-form";

interface TopicTitleUpdateFormProps {
  data: Topic;
}

const TopicTitleUpdateForm: FC<TopicTitleUpdateFormProps> = ({ data }) => {
  //  function for copying topics
  const { execute } = useAction(copyTopics, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.name} is begin created!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  //   function for deleting topics
  const deleteChapter = useAction(deleteTopic, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.name} is deleted succefully!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <div className="flex items-center justify-between">
      <TopicUpdateForm topicName={data?.name} topicId={data?.id} />
      <ToogleMenu
        actionName="Topic actions"
        ToogleButton={<MoreVertical className="size-4 cursor-pointer" />}
      >
        <div
          className="w-full cursor-pointer h-fit p-2 text-sm rounded-md transition-colors duration-200 hover:bg-slate-100"
          onClick={() => execute({ topicId: data?.id })}
        >
          Copy topic...
        </div>

        <div
          className="w-full cursor-pointer  h-fit p-2 text-sm rounded-md transition-colors duration-200 hover:bg-slate-100"
          onClick={() => deleteChapter?.execute({ topicId: data?.id })}
        >
          Delete this topic
        </div>
      </ToogleMenu>
    </div>
  );
};

export default TopicTitleUpdateForm;

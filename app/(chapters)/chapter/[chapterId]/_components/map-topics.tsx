"use client";

import { FC } from "react";
import { SubTopic, Topic } from "@prisma/client";
import CreateTopicForm from "./create-topic-form";
import { MoreVertical } from "lucide-react";
import ToogleMenu from "@components/global/toogle-menu";
import CreateSubTopicForm from "./create-subtopic-form";
import Card from "./card";
import TopicUpdateForm from "./topic-update-form";
import { useAction } from "@hooks/useAction";
import { copyTopics } from "@actions/topics/copy-topics";
import { toast } from "sonner";
import { deleteTopic } from "@actions/topics/delete";

interface MapTopicsProps {
  topics: Topic[] &
    {
      subTopics: SubTopic[];
    }[];
  chapterId: string;
}

const MapTopics: FC<MapTopicsProps> = ({ topics, chapterId }) => {
  const { isLoading, execute } = useAction(copyTopics, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.name} is begin created!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const deleteChapter = useAction(deleteTopic, {
    onSuccess: (data) => {
      toast.success(`topic ${data?.name} is deleted succefully!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <div
      className="w-full h-full grid  grid-cols-1
        gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5"
    >
      {topics?.map((data) => (
        <div
          key={data?.id}
          className="bg-white/20 backdrop-blur-sm p-3 h-fit w-full rounded-md  shadow-md shadow-black/10 "
        >
          <div className="flex items-center justify-between">
            <TopicUpdateForm topicName={data?.name} topicId={data?.id} />
            <ToogleMenu
              actionName="Topic actions"
              ToogleButton={<MoreVertical className="size-4 cursor-pointer" />}
            >
              <div
                aria-disabled={true}
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

          <div className="py-3 space-y-3">
            {/* @ts-ignore  */}
            {data?.subTopics?.map((subTopicOutput) => (
              <Card subTopic={subTopicOutput} key={subTopicOutput?.id} />
            ))}
          </div>
          <CreateSubTopicForm topicId={data?.id} />
        </div>
      ))}
      <CreateTopicForm chapterId={chapterId} />
    </div>
  );
};

export default MapTopics;

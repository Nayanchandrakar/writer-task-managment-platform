import { FC } from "react";
import { SubTopic, Topic } from "@prisma/client";
import CreateTopicForm from "./create-topic-form";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import ToogleMenu from "@components/global/toogle-menu";
import CreateSubTopicForm from "./create-subtopic-form";

interface MapTopicsProps {
  topics: Topic[] &
    {
      subTopics: SubTopic[];
    }[];
  chapterId: string;
}

const MapTopics: FC<MapTopicsProps> = ({ topics, chapterId }) => {
  return (
    <div
      className="w-full h-full grid  grid-cols-1
        gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5"
    >
      {topics?.map((data) => (
        <div
          key={data?.id}
          className="bg-white/80 p-3 h-fit w-full rounded-md   "
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold first-letter:uppercase  text-sm">
              {data?.name}
            </span>
            <ToogleMenu
              actionName="Topic actions"
              ToogleButton={<MoreVertical className="size-4 cursor-pointer" />}
            >
              <DropdownMenuItem>Add topic...</DropdownMenuItem>
              <DropdownMenuItem>Copy topic...</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-200" />
              <DropdownMenuItem>Delete this topic</DropdownMenuItem>
            </ToogleMenu>
          </div>

          <div className="py-2">
            {/* @ts-ignore  */}
            {data?.subTopics?.map((subTopicOutput) => (
              <div className="">const</div>
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

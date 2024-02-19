"use client";
import DialogModal from "@components/modals/dialog-modal";
import { useSubTopicToogleModal } from "@hooks/use-subtopic-toogle-modal";
import { SubTopic } from "@prisma/client";
import HeadingShortner from "./heading-shortner";
import { Activity, Layers, Text } from "lucide-react";
import { Textarea } from "@components/ui/textarea";
import SubTopicActions from "./subtopic-actions";

const SubTopicToogleModal = ({
  data,
  topicName,
}: {
  data: SubTopic;
  topicName: string;
}) => {
  const subTopicToogleModal = useSubTopicToogleModal();

  return (
    <DialogModal
      className="w-[45rem]"
      isOpen={subTopicToogleModal?.isOpen}
      onClose={subTopicToogleModal?.onClose}
    >
      <HeadingShortner className="mb-3" Icon={Layers} title={data?.title}>
        <p className="text-sm">
          In subTopic{" "}
          <span className="underline underline-offset-1">{topicName}</span>
        </p>
      </HeadingShortner>

      <div className="flex items-center gap-x-4 w-full">
        <HeadingShortner className="w-[60%] " Icon={Text} title="Description">
          <Textarea
            className="bg-zinc-100 w-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter you description here..."
          />
        </HeadingShortner>
        <SubTopicActions />
      </div>

      <HeadingShortner Icon={Activity} title="Activity">
        {/* for looping activity here  */}
      </HeadingShortner>
    </DialogModal>
  );
};

export default SubTopicToogleModal;

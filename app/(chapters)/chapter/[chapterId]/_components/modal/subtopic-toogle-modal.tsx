"use client";
import DialogModal from "@components/modals/dialog-modal";
import { useSubTopicToogleModal } from "@hooks/use-subtopic-toogle-modal";
import { SubTopic } from "@prisma/client";
import HeadingShortner from "./heading-shortner";
import { Activity, Layers, Text } from "lucide-react";
import { Textarea } from "@components/ui/textarea";
import SubTopicActions from "./subtopic-actions";
import { useAction } from "@hooks/useAction";
import { updateSubTopic } from "@actions/subtopics/update";
import { toast } from "sonner";
import { useState } from "react";
import MapAcitivities from "../map-activitylog";
import { useRouter } from "next/navigation";

const SubTopicToogleModal = ({
  data,
  topicName,
}: {
  data: SubTopic;
  topicName: string;
}) => {
  const subTopicToogleModal = useSubTopicToogleModal();
  const router = useRouter();
  const [subTopicDesc, setsubTopicDesc] = useState<string>(
    data?.description || ""
  );

  const { isLoading, execute, error } = useAction(updateSubTopic, {
    onSuccess: (data) => {
      toast.success(`subTopic updated`);
      router?.refresh();
    },
    onError: (error) => toast.error(error),
  });

  const handleUpdate = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e?.key === "Enter" && subTopicDesc) {
      execute({
        subTopicId: data?.id,
        description: subTopicDesc,
      });
    }
    return;
  };

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
            disabled={isLoading}
            onChange={(e) => setsubTopicDesc(e?.target?.value)}
            value={subTopicDesc}
            className="bg-zinc-100 w-full resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyUp={(e) => handleUpdate(e)}
            placeholder="Enter you description here..."
          />
        </HeadingShortner>
        <SubTopicActions />
      </div>

      <HeadingShortner Icon={Activity} title="Activity">
        <MapAcitivities entityId={data?.topicId!} />
      </HeadingShortner>
    </DialogModal>
  );
};

export default SubTopicToogleModal;

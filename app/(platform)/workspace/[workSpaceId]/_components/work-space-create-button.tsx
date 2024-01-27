"use client";
import { FC } from "react";
import { Button } from "@components/ui/button";
import { useNotesModal } from "@hooks/use-notes-modal";
import { Plus } from "lucide-react";
import { cn } from "@lib/utils";

interface WorkSpaceButtonProps {
  workSpaceId: string;
  className?: string;
}

const WorkSpaceButton: FC<WorkSpaceButtonProps> = ({
  workSpaceId,
  className,
}) => {
  const notesModal = useNotesModal();

  const handleToogle = () => {
    notesModal.onOpen();
  };

  return (
    <Button
      onClick={() => handleToogle()}
      size="sm"
      className={cn("w-full h-7 ", className)}
    >
      <Plus className="w-4 h-4" />
    </Button>
  );
};

export default WorkSpaceButton;

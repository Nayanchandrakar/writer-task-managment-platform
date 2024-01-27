"use client";
import { FC } from "react";
import { Button } from "@components/ui/button";
import { useNotesModal } from "@hooks/use-notes-modal";
import { Plus } from "lucide-react";

interface WorkSpaceButtonProps {
  workSpaceId: string;
}

const WorkSpaceButton: FC<WorkSpaceButtonProps> = ({ workSpaceId }) => {
  const notesModal = useNotesModal();

  const handleToogle = () => {
    notesModal.onOpen();
  };

  return (
    <Button onClick={() => handleToogle()} size="sm" className="w-full h-7 ">
      <Plus className="w-4 h-4" />
    </Button>
  );
};

export default WorkSpaceButton;

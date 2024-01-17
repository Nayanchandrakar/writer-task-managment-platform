"use client";

import { FC } from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DialogModal from "@components/modals/dialog-modal";
import { useWorkSpaceModal } from "@hooks/use-workspace-modal";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

interface CreatWorkSpaceProps {}

const CreatWorkSpace: FC<CreatWorkSpaceProps> = ({}) => {
  const workSpaceModal = useWorkSpaceModal();

  return (
    <DialogModal
      isOpen={workSpaceModal?.isOpen}
      onClose={workSpaceModal?.onClose}
      onOpen={workSpaceModal?.onOpen}
    >
      <DialogHeader>
        <DialogTitle>Work Space</DialogTitle>
        <DialogDescription>
          create your own personal notes with writer.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Input />
        </div>
      </div>

      <DialogFooter className="sm:justify-start">
        <Button type="submit" className="px-3">
          Create
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogModal>
  );
};

export default CreatWorkSpace;

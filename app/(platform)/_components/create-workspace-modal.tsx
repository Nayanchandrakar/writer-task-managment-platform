"use client";

import { FC, useState } from "react";
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
import { useAction } from "@hooks/useAction";
import { createWorkSpaceAction } from "@actions/index";
import { WorkSpace } from "@prisma/client";
import { toast } from "sonner";

interface CreatWorkSpaceProps {}

const CreatWorkSpace: FC<CreatWorkSpaceProps> = ({}) => {
  const [workSpace, setWorkSpace] = useState<WorkSpace | null>(null);
  const workSpaceModal = useWorkSpaceModal();

  const { execute, isLoading } = useAction(createWorkSpaceAction, {
    onSuccess: (data) => {
      setWorkSpace(data);
      toast.success(`${data?.name} workspace created!`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => {
      workSpaceModal?.onClose();
    },
  });

  const onSubmit = async (formData: FormData) => {
    // execute({
    //   name,
    // });
    console.log(formData?.get("name"));
  };

  return (
    <DialogModal
      isOpen={workSpaceModal?.isOpen}
      onClose={workSpaceModal?.onClose}
      onOpen={workSpaceModal?.onOpen}
    >
      <form id="form-button" className="space-y-3" action={onSubmit}>
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold">Work Space</span>
          <p> create your own personal notes with writer.</p>
        </div>
        <Input disabled={isLoading} required />

        <div className="flex items-center space-x-2 mt-2">
          <Button
            disabled={isLoading}
            id="form-button"
            type="submit"
            className="px-3"
          >
            Create
          </Button>

          <DialogClose asChild>
            <Button disabled={isLoading} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogModal>
  );
};

export default CreatWorkSpace;

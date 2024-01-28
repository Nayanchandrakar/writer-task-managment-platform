"use client";

import { FC } from "react";

import DialogModal from "@components/modals/dialog-modal";
import { useWorkSpaceModal } from "@hooks/use-workspace-modal";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAction } from "@hooks/useAction";
import { createWorkSpaceAction } from "@actions/workspace/create-worspace/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreatWorkSpaceProps {}

const CreatWorkSpace: FC<CreatWorkSpaceProps> = ({}) => {
  const workSpaceModal = useWorkSpaceModal();
  const router = useRouter();

  const { execute, isLoading } = useAction(createWorkSpaceAction, {
    onSuccess: (data) => {
      router.push(`/workspace/${data?.id}`);
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
    const name = formData?.get("name") as string;

    execute({
      name,
    });
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
          <p> create your own personal worspace with writer.</p>
        </div>
        <Input id="name" name="name" disabled={isLoading} required />

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

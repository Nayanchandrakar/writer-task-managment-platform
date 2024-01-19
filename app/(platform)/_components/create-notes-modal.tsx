"use client";

import { FC } from "react";

import DialogModal from "@components/modals/dialog-modal";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAction } from "@hooks/useAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useNotesModal } from "@hooks/use-notes-modal";
import { createnotesAction } from "@actions/notes/create-notes/index";

interface CreateNoteModalProps {}

const CreateNoteModal: FC<CreateNoteModalProps> = ({}) => {
  const workSpaceModal = useNotesModal();
  const router = useRouter();

  const { execute, isLoading } = useAction(createnotesAction, {
    onSuccess: (data) => {
      router?.refresh();
      toast.success(`${data?.noteTitle} Note created!`);
    },
    onError: (error) => {
      toast.error(error);
    },
    onComplete: () => {
      workSpaceModal?.onClose();
    },
  });

  const onSubmit = async (formData: FormData) => {
    const noteTitle = formData?.get("noteTitle") as string;

    execute({
      noteTitle,
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
          <span className="text-base font-semibold">Create Note</span>
          <p> create your own personal notes with writer.</p>
        </div>
        <Input id="noteTitle" name="noteTitle" disabled={isLoading} required />

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

export default CreateNoteModal;

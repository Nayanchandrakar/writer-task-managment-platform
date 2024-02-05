"use client";

import { FC } from "react";

import DialogModal from "@components/modals/dialog-modal";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAction } from "@hooks/useAction";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useNotesModal } from "@hooks/use-notes-modal";
import { createnotesAction } from "@actions/notes/create-notes/index";
import { useSubscription } from "@hooks/use-subscription-modal";

interface CreateNoteModalProps {}

const CreateNoteModal: FC<CreateNoteModalProps> = ({}) => {
  const workSpaceModal = useNotesModal();
  const subscriptionModal = useSubscription();
  const router = useRouter();
  const params = useParams();
  const workSpaceId =
    (params?.workSpaceId as string) || workSpaceModal?.workSpaceId;

  const { execute, isLoading } = useAction(createnotesAction, {
    onSuccess: (data) => {
      router?.push(`/workspace/${data?.workSpaceId}/notes/${data?.id}`);
      toast.success(`${data?.noteTitle} Note created!`);
    },
    onError: (error) => {
      if (error === "304") {
        return subscriptionModal?.onOpen();
      }
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
      workSpaceId,
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

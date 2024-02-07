"use client";

import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Plus } from "lucide-react";
import { MAX_FREE_lIMIT_COUNT } from "@constants";
import { useCreateChapterModal } from "@hooks/use-create-chapter-modal";

interface CreateChaptersProps {
  isPro: boolean;
}

const CreateChapters: FC<CreateChaptersProps> = ({ isPro }) => {
  const createChapterModal = useCreateChapterModal();

  return (
    <div
      onClick={() => createChapterModal?.onOpen()}
      className="w-48 h-28 rounded-sm text-xs bg-zinc-100 flex items-center justify-center relative transition-colors duration-200 hover:bg-zinc-200 cursor-pointer"
    >
      <Plus className="size-4 text-gray-500 " />

      {!isPro && (
        <div className="absolute bottom-1 right-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="size-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent className="w-60">
                <p className="text-xs font-medium text-gray-600">
                  Free accounts can have upto {MAX_FREE_lIMIT_COUNT?.notes}{" "}
                  notes and have {MAX_FREE_lIMIT_COUNT?.chapters} chapters in
                  each notes. For unlimited chapters creation upgrade to pro.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};
export default CreateChapters;

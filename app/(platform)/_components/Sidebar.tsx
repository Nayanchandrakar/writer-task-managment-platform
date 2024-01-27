"use client";

import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { Button } from "@components/ui/button";
import { WorkSpace, Note } from "@prisma/client";
import { useWorkSpaceModal } from "@hooks/use-workspace-modal";
import { useNotesModal } from "@hooks/use-notes-modal";
import { cn } from "@lib/utils";
import { useRouter, useParams } from "next/navigation";

interface SidebarProps {
  workSpaces:
    | (WorkSpace & {
        notes: Note[] | null;
      })[]
    | null;
}

const Sidebar: FC<SidebarProps> = ({ workSpaces }) => {
  const workSpaceModal = useWorkSpaceModal();
  const notesModal = useNotesModal();
  const router = useRouter();
  const params = useParams();

  const handleToogle = (id: string) => {
    notesModal.setWorkSpaceId(id);
    notesModal.onOpen();
  };

  const handleClick = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const noteId = params.noteId;

  const isActive = (
    data:
      | (WorkSpace & {
          notes: Note[] | null;
        })
      | null
  ) => {
    return data?.notes?.some((note) => !!(note?.id === noteId));
  };

  return (
    <div className="md:mt-16 w-full h-full md:p-4 md:pt-12  ">
      <div
        onClick={() => workSpaceModal?.onOpen()}
        className="flex justify-between items-center cursor-pointer px-3 transiton-colors duration-300 group"
      >
        <span className="text-sm font-medium group-hover:opacity-90">
          Create a Board{" "}
        </span>
        <span className="w-8 h-8 flex items-center justify-center  group-hover:bg-slate-100  transiton-colors duration-300 rounded-full">
          <Plus className="w-4 h-4" />
        </span>
      </div>

      {/* Accordion list  */}
      <div className="mt-4">
        {workSpaces?.length === 0 ? null : (
          <Accordion type="single" className="space-y-2" collapsible>
            {workSpaces?.map((workSpace) => (
              <AccordionItem
                id={workSpace?.id}
                className="border-none"
                value={workSpace?.name}
              >
                <AccordionTrigger
                  className={cn(
                    "text-sm font-normal p-3 bg-slate-100 w-full h-fit hover:no-underline rounded-lg",
                    isActive(workSpace) && "bg-slate-200"
                  )}
                >
                  {workSpace?.name}
                </AccordionTrigger>

                <AccordionContent className="my-2 space-y-2 flex items-center flex-col justify-center pb-0">
                  {workSpace?.notes?.length === 0
                    ? null
                    : workSpace?.notes?.map((note) => (
                        <div
                          onClick={() => handleClick(note?.id)}
                          key={note?.id}
                          className={cn(
                            "w-full  h-8 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200 border cursor-pointer flex items-center justify-center text-xs ",
                            noteId === note?.id
                              ? "bg-sky-100 hover:bg-sky-200 border-sky-700 text-sky-700"
                              : "border-gray-100 text-gray-700"
                          )}
                        >
                          {note?.noteTitle}
                        </div>
                      ))}

                  <Button
                    onClick={() => handleToogle(workSpace?.id)}
                    size="sm"
                    className="w-full h-7 "
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

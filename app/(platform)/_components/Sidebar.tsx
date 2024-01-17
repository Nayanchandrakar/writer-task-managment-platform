import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { Button } from "@components/ui/button";
import { WorkSpace } from "@prisma/client";

interface SidebarProps {
  workSpaces: WorkSpace[] | null;
}

const Sidebar: FC<SidebarProps> = ({ workSpaces }) => {
  return (
    <div className="md:mt-16 w-full h-full md:p-4 md:pt-12  ">
      <div className="flex justify-between items-center cursor-pointer px-3 transiton-colors duration-300 group">
        <span className="text-sm font-medium group-hover:opacity-90">
          Create a Board{" "}
        </span>
        <span className="w-8 h-8 flex items-center justify-center bg-slate-200 group-hover:bg-slate-100  transiton-colors duration-300 rounded-full">
          <Plus className="w-4 h-4" />
        </span>
      </div>

      {/* Accordion list  */}
      <div className="mt-4">
        {workSpaces?.length === 0 ? null : (
          <Accordion type="single" collapsible>
            {workSpaces?.map((workSpace) => (
              <AccordionItem
                id={workSpace?.id}
                className="border-none"
                value={workSpace?.name}
              >
                <AccordionTrigger className="text-sm font-medium p-2 bg-slate-100 w-full h-fit hover:no-underline rounded-lg">
                  {workSpace?.name}
                </AccordionTrigger>

                <AccordionContent className="my-2">
                  <Button size="sm" className="w-full h-7">
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

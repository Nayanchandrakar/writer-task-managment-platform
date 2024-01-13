import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { Button } from "@components/ui/button";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <div className="md:mt-16 w-full h-full md:p-4 md:pt-12  ">
      <div className="flex justify-between items-center cursor-pointer px-3">
        <span className="text-sm font-medium ">Create a Board </span>
        <Plus className="w-4 h-4" />
      </div>

      {/* Accordion list  */}
      <div className="mt-4">
        <Accordion type="single" collapsible>
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="text-sm font-medium p-2 bg-slate-100 w-full h-fit hover:no-underline rounded-lg">
              Accord
            </AccordionTrigger>

            <AccordionContent className="my-2">
              <Button size="sm" className="w-full h-7">
                <Plus className="w-4 h-4" />
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;

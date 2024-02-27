"use client";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { X } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";

interface ToogleMenuProps {
  ToogleButton: React.ReactNode;
  children: React.ReactNode;
  actionName: string;
}

const ToogleMenu = ({
  ToogleButton,
  children,
  actionName,
}: ToogleMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger className="" asChild>
        {ToogleButton}
      </PopoverTrigger>
      <PopoverContent className="w-72 ">
        <div className="flex items-center flex-row justify-between">
          <span className="px-4" />

          <span className="text-sm font-medium flex items-center ">
            {actionName}
          </span>

          <PopoverClose>
            <Button variant="ghost" size="sm">
              <X className="size-4" />
            </Button>
          </PopoverClose>
        </div>

        <hr className="mt-1.5" />
        <div className="py-3">{children}</div>
      </PopoverContent>
    </Popover>
  );
};

export default ToogleMenu;

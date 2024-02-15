"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { X } from "lucide-react";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{ToogleButton}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 ">
        <div className="flex items-center flex-row justify-between">
          <span className="px-4" />

          <span className="text-sm font-medium flex items-center ">
            {actionName}
          </span>

          <Button variant="ghost" size="sm">
            <X className="size-4" />
          </Button>
        </div>

        <div className="py-3">{children}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToogleMenu;

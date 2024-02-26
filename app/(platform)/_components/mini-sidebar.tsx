"use client";

import { FC, useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Note, WorkSpace } from "@prisma/client";
import { useMobileMenu } from "@hooks/use-mobile-menu";

interface MiniSidebarProps {
  workSpaces:
    | (WorkSpace & {
        notes: Note[] | null;
      })[]
    | null;
}

const MiniSidebar: FC<MiniSidebarProps> = ({ workSpaces }) => {
  const [isMount, setIsMounted] = useState(false);

  const { isOpen, onClose } = useMobileMenu((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
    onOpen: state.onOpen,
  }));

  useEffect(() => {
    setIsMounted(true);
  }, [isMount]);

  if (!isMount) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <Sidebar workSpaces={workSpaces} />
      </SheetContent>
    </Sheet>
  );
};

export default MiniSidebar;

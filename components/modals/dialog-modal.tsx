"use client";

import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
}

const DialogModal: FC<DialogModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  children,
}) => {
  const [IsMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [IsMounted]);

  if (!IsMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogModal;

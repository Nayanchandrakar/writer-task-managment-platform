"use client";

import { create } from "zustand";

interface useWorkSpaceInterface {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  subTopicId: string | null;
}

export const useSubTopicToogleModal = create<useWorkSpaceInterface>((set) => ({
  isOpen: false,
  subTopicId: "",
  onClose: () => set({ isOpen: false }),
  onOpen: (id) => set({ isOpen: true, subTopicId: id }),
}));

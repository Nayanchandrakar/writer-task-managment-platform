"use client";

import { create } from "zustand";

interface useWorkSpaceInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNotesModal = create<useWorkSpaceInterface>((set) => ({
  isOpen: false,
  workSpaceId: "",
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

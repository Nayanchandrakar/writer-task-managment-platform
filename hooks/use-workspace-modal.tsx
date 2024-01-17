"use client";

import { create } from "zustand";

interface useWorkSpaceInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useWorkSpaceModal = create<useWorkSpaceInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

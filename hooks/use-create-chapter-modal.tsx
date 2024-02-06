"use client";

import { create } from "zustand";

interface useCreateChapterModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateChapterModal = create<useCreateChapterModalInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export { useCreateChapterModal };

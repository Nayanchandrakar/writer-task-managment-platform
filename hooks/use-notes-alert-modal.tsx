"use client";

import { create } from "zustand";

interface useNotesAlertInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNotesAlert = create<useNotesAlertInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export { useNotesAlert };

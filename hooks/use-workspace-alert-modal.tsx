"use client";

import { create } from "zustand";

interface useWorkSpaceLimitsInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useWorkSpaceLimits = create<useWorkSpaceLimitsInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export { useWorkSpaceLimits };

"use client";

import { create } from "zustand";

interface useMobileMenuInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileMenu = create<useMobileMenuInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export { useMobileMenu };

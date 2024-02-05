"use client";

import { create } from "zustand";

interface useSubscriptionInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscription = create<useSubscriptionInterface>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export { useSubscription };

import { create } from "zustand";

interface AssistantStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useAssistantStore = create<AssistantStore>()((set) => ({
  isOpen: false,
  setOpen: (open) => set((state) => ({ isOpen: open })),
}));

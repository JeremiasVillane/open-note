import { create } from "zustand";
import { UiState } from "@/types";

export const useUiStore = create<UiState>((set) => ({
  status: null,
  leftPanelIsClosed: false,
  activeModal: undefined,
  setStatus: (status) => {
    set({ status });
    setTimeout(() => {
      set({ status: null });
    }, 2000);
  },
  setLeftPanelIsClosed: (value) => set({ leftPanelIsClosed: value }),
  setActiveModal: (value) => set({ activeModal: value }),
}));

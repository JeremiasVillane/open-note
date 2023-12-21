import { invoke } from "@tauri-apps/api/tauri";

export const renderModal = async ({
  label,
  width = 400,
  height = 175,
  setActiveModal,
}: {
  label: string;
  width?: number;
  height?: number;
  setActiveModal: (value: boolean) => void;
}) => {
  await invoke("open_window", { label, width, height });

  setActiveModal(true);
};

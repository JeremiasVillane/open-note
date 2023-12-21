import { invoke } from "@tauri-apps/api/tauri";

/**
 * Renders a modal with the specified label, width, and height.
 *
 * @param {object} props - The props object.
 * @param {string} props.label - The label to display in the modal.
 * @param {number} [props.width=400] - The width of the modal in pixels.
 * @param {number} [props.height=175] - The height of the modal in pixels.
 * @param {function} props.setActiveModal - A function to set the active state of the modal.
 * @return {Promise<void>} - A promise that resolves when the modal is rendered.
 */
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
}): Promise<void> => {
  await invoke("open_window", { label, width, height });

  setActiveModal(true);
};

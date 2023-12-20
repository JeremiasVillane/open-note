import { useHotkeys } from "@mantine/hooks";
import { ItemStateType } from "@/types";
import ContextMenu from "./ContextMenu";

/**
 * Renders a NoteMenu component.
 *
 * @param {object} props - The props object.
 * @param {string} props.menuItemStyles - The styles for the menu items.
 * @param {function} props.updateItemState - The function to update the item state.
 * @param {function} props.handleClose - The function to handle closing the current note.
 * @param {function} props.handleDelete - The function to handle deleting the current note.
 * @return {React.ReactElement} The rendered NoteMenu component.
 */
export default function NoteMenu({
  menuItemStyles,
  updateItemState,
  handleClose,
  handleDelete,
}: {
  menuItemStyles: string;
  updateItemState: React.Dispatch<ItemStateType>;
  handleClose: () => Promise<void>;
  handleDelete: () => Promise<void>;
}): React.ReactElement {
  useHotkeys(
    [["escape", () => updateItemState({ context: false })]],
    undefined,
    true
  );

  const controls = [
    {
      onClick: () => {
        updateItemState({ toRename: true });
        updateItemState({ context: false });
      },
      label: "Rename",
    },
    {
      onClick: async () => {
        await handleClose();
        updateItemState({ context: false });
      },
      label: "Close",
    },
    {
      onClick: async () => {
        await handleDelete();
        updateItemState({ context: false });
      },
      label: "Delete",
    },
  ];

  return <ContextMenu controls={controls} menuItemStyles={menuItemStyles} />;
}

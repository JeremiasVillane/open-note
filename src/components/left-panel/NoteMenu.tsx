import { useHotkeys } from "@mantine/hooks";
import { itemStateType } from "../../types";
import ContextMenu from "./ContextMenu";

/**
 * Renders a NoteMenu component.
 *
 * @prop {string} menuItemStyles - The styles for the menu items.
 * @prop {function} updateItemState - The function to update the item state.
 * @prop {function} handleClose - The function to handle closing the current note.
 * @prop {function} handleDelete - The function to handle deleting the current note.
 * @return {JSX.Element} The rendered NoteMenu component.
 */
export default function NoteMenu({
  menuItemStyles,
  updateItemState,
  handleClose,
  handleDelete,
}: {
  menuItemStyles: string;
  updateItemState: React.Dispatch<itemStateType>;
  handleClose: () => Promise<void>;
  handleDelete: () => Promise<void>;
}): JSX.Element {
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

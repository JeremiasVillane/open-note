import { Paper, UnstyledButton } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { itemStateType } from "../../types";

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
}) {
  const { t } = useTranslation();

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

  return (
    <Paper shadow="sm" className="flex flex-col p-1 z-50">
      {controls.map((control, index) => (
        <UnstyledButton
          key={index}
          onClick={control.onClick}
          className={`${menuItemStyles} ${
            index === controls.length - 1 ? "text-red-600" : ""
          }`}
        >
          {t(control.label)}
        </UnstyledButton>
      ))}
    </Paper>
  );
}

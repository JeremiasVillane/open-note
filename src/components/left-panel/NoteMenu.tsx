import { Paper, UnstyledButton } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export default function NoteMenu({
  menuItemStyles,
  setToRename,
  setContext,
  handleClose,
  handleDelete,
}: {
  menuItemStyles: string;
  setToRename: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  handleDelete: () => void;
}) {
  const { t } = useTranslation();

  useHotkeys(
    [
      ["escape", () => setContext(false)],
    ],
    undefined,
    true
  );

  return (
    <Paper shadow="sm" className="flex flex-col p-1">
      <UnstyledButton
        onClick={() => {
          setToRename(true);
          setContext(false);
        }}
        className={menuItemStyles}
      >
        {t("Rename")}
      </UnstyledButton>

      <UnstyledButton
        onClick={async () => {
          handleClose();
          setContext(false);
        }}
        className={menuItemStyles}
      >
        {t("Close")}
      </UnstyledButton>

      <UnstyledButton
        onClick={async () => {
          handleDelete();
          setContext(false);
        }}
        className={`${menuItemStyles} text-red-600`}
      >
        {t("Delete")}
      </UnstyledButton>
    </Paper>
  );
}

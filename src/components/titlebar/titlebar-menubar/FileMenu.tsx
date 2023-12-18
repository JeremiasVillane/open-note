import { Menu, Text, UnstyledButton } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { appWindow } from "@tauri-apps/api/window";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleClose, handleSave } from "../../../helpers";
import TitleBarContext from "../../../providers/titlebar-provider";
import { useNotesStore } from "../../../store/notesStore";
import { useUiStore } from "../../../store/uiStore";

/**
 * Renders a file menu component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.menuItemStyles - The styles for the menu items.
 * @param {string} props.menuTitleStyles - The styles for the menu title.
 * @param {Partial<Omit<TransitionProps, "mounted">>} props.transitionProps - The menu transition props.
 * @param {boolean} props.open - Indicates whether the menu is open or closed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpen - The function to set the open state.
 * @return {JSX.Element} The rendered file menu component.
 */
export default function FileMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}): JSX.Element {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { currentNote, setCurrentNote, setShowNewItemForm } = useNotesStore();
  const { setActiveModal, setLeftPanelIsClosed } = useUiStore();
  const { setStatus } = useUiStore();
  const { openMenu, setOpenMenu, transitionProps } =
    useContext(TitleBarContext);
  const [opened, setOpened] = useState(false);

  const isEdited: boolean =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  return (
    <Menu
      trigger={openMenu ? "hover" : "click"}
      transitionProps={transitionProps}
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      shadow="md"
      offset={3}
    >
      <Menu.Target>
        <UnstyledButton
          className="cursor-default"
          onClick={() => {
            setOpenMenu(!openMenu);
            setOpened(!opened);
          }}
        >
          <Text
            inline
            size="sm"
            className={menuTitleStyles}
            data-text={t("File")}
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg whitespace-nowrap">
        <Menu.Item
          onClick={() => {
            setShowNewItemForm("note");
            setLeftPanelIsClosed(false);
          }}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + N</Text>}
        >
          <Text
            inline
            size="sm"
            className="overlook"
            data-text={t("New note")}
          />
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            setShowNewItemForm("folder");
            setLeftPanelIsClosed(false);
          }}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + Shift + F</Text>}
        >
          <Text
            inline
            size="sm"
            className="overlook"
            data-text={t("New folder")}
          />
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={async () =>
            await handleSave(t, editor!, {
              currentNote,
              setCurrentNote,
              setStatus,
            })
          }
          className={menuItemStyles}
          rightSection={
            <Text size="xs" className="whitespace-nowrap">
              Ctrl + S
            </Text>
          }
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Save")} />
        </Menu.Item>

        <Menu.Item
          onClick={async () =>
            await handleClose(
              isEdited,
              setCurrentNote,
              editor,
              setActiveModal
            )
          }
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + W</Text>}
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Close")} />
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={async () => await appWindow.close()}
          rightSection={<Text size="xs">Alt + F4</Text>}
          className={menuItemStyles}
        >
          <Text inline size="sm" className="overlook" data-text={t("Exit")} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

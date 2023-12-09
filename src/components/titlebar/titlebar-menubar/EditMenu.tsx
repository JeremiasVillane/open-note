import { Menu, Text, UnstyledButton } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../../store/notesStore";
import LanguageSubMenu from "./LanguageSubMenu";
import ThemeSubMenu from "./ThemeSubMenu";

export default function EditMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}) {
  const { i18n, t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { currentNote } = useNotesStore();

  return (
    <Menu position="bottom-start" shadow="md" width={200} offset={3}>
      <Menu.Target>
        <UnstyledButton className="cursor-default">
          <Text
            inline
            size="sm"
            className={menuTitleStyles}
            data-text={t("Edit")}
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item
          onClick={() => editor?.commands.undo()}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + Z</Text>}
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Undo")} />
        </Menu.Item>

        <Menu.Item
          onClick={() => editor?.commands.redo()}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + Shift + Z</Text>}
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Redo")} />
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={() => editor?.commands.cut()}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + X</Text>}
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Cut")} />
        </Menu.Item>

        <Menu.Item
          onClick={() => editor?.commands.copy()}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + C</Text>}
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Copy")} />
        </Menu.Item>

        <Menu.Item
          onClick={() => editor?.commands.paste()}
          className={menuItemStyles}
          rightSection={<Text size="xs">Ctrl + V</Text>}
          disabled={!currentNote}
        >
          <Text inline size="sm" className="overlook" data-text={t("Paste")} />
        </Menu.Item>
        <Menu.Divider />

        <Menu trigger="hover" position="right-start" shadow="md" offset={5}>
          <Menu.Target>
            <Menu.Item
              className={`${menuItemStyles} py-[inherit]`}
              rightSection={<i className="ri-arrow-right-s-line text-lg" />}
            >
              <Text
                inline
                size="sm"
                className={`overlook ${menuItemStyles}`}
                data-text={t("Preferences")}
              />
            </Menu.Item>
          </Menu.Target>
          <Menu.Dropdown className="shadow-lg">
            <LanguageSubMenu i18n={i18n} menuItemStyles={menuItemStyles} />
            <ThemeSubMenu menuItemStyles={menuItemStyles} />
          </Menu.Dropdown>
        </Menu>
      </Menu.Dropdown>
    </Menu>
  );
}

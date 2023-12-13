import { useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { handleClose, handleSave, loadFiles } from "../helpers";
import { useTauriContext } from "../providers/tauri-provider";
import { useNotesStore } from "../store/notesStore";
import { cycleLang } from "../utils";

/**
 * It provides global hotkey functionality.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The children to be wrapped by the HotkeysProvider.
 * @return {React.ReactNode} The wrapped children.
 */
export default function HotkeysProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { i18n, t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { appFolder } = useTauriContext();
  const { toggleColorScheme } = useMantineColorScheme();
  const {
    currentNote,
    setCurrentNote,
    setStatus,
    setItems,
    setShowNewItemForm,
    leftPanelIsClosed,
    setLeftPanelIsClosed,
  } = useNotesStore();

  const isEdited: boolean =
    editor?.getText() !== "" &&
    (currentNote?.content !== undefined ||
      currentNote?.content !== "<p></p>") &&
    editor?.getHTML() !== currentNote?.content;

  useHotkeys(
    [
      ["ctrl+T", toggleColorScheme],
      ["ctrl+L", () => cycleLang(i18n)],
      [
        "ctrl+S",
        async () =>
         await handleSave(t, editor!, {
            currentNote,
            setCurrentNote,
            setStatus,
          }),
      ],
      [
        "ctrl+W",
        async () => await handleClose(t, isEdited, setCurrentNote, editor),
      ],
      ["ctrl+shift+E", () => setLeftPanelIsClosed(!leftPanelIsClosed)],
      [
        "ctrl+shift+R",
        async () => {
          await loadFiles(appFolder, setItems);
          setStatus(t("Files loaded"));
          setLeftPanelIsClosed(false);
        },
      ],
      [
        "ctrl+N",
        () => {
          setShowNewItemForm("note");
          setLeftPanelIsClosed(false);
        },
      ],
      [
        "ctrl+shift+F",
        () => {
          setShowNewItemForm("folder");
          setLeftPanelIsClosed(false);
        },
      ],
    ],
    undefined, // HTML tag names that hotkeys will not trigger on
    true // Whether shortcuts should trigger when based on contentEditable
  );

  useHotkeys([["ctrl+F", () => null]]);

  return <>{children}</>;
}

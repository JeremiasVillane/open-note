import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
} from "./components";
import { handleClose, handleSave, loadFiles } from "./helpers";
import { useTauriContext } from "./providers/tauri-provider";
import { useNotesStore } from "./store/notesStore";
import "./styles/App.css";

export default function App(): JSX.Element {
  const { t } = useTranslation();
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

  useHotkeys([
    ["ctrl+T", toggleColorScheme],
    [
      "ctrl+S",
      () =>
        handleSave(t, editor!, {
          currentNote,
          setCurrentNote,
          setStatus,
        }),
    ],
    [
      "ctrl+W",
      async () => 
        await handleClose(t, isEdited, 
          setCurrentNote, editor
        ),
    ],
    ["ctrl+shift+E", () => 
      setLeftPanelIsClosed(!leftPanelIsClosed)],
    [
      "ctrl+shift+R",
      () => {
        loadFiles(appFolder, setItems);
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
  ]);

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 33 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: {
          mobile: leftPanelIsClosed,
          desktop: leftPanelIsClosed,
        },
      }}
      className="overflow-hidden select-none"
    >
      <MainPanelLayout />

      <HeaderLayout />

      <LeftPanelLayout />

      <FooterLayout />
    </AppShell>
  );
}

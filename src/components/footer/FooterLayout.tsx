import { AppShellFooter } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { count } from "letter-count";
import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../store/notesStore";

export function FooterLayout() {
  const {  t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { status } = useNotesStore();
  
  const editorContent = editor?.getText();
  const stadistics = count(editorContent ?? "");

  return (
    <AppShellFooter
      p="md"
      className="flex justify-between items-center font-mono text-xs"
    >
      {editorContent?.length ? (
        <div>
          {t("Characters")}: {stadistics.chars}{" "}|{" "}
          {t("Letters")}: {stadistics.letters}{" "}|{" "}
          {t("Words")}: {stadistics.words}{" "}|{" "}
          {t("Lines")}: {stadistics.lines > 1 
            ? stadistics.lines - (stadistics.lines - 1) / 2 
            : stadistics.lines}
        </div>
      ) : (
        <></>
      )}

      {status}
    </AppShellFooter>
  )
}

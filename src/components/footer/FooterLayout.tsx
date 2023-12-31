import { AppShellFooter } from "@mantine/core";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { count } from "letter-count";
import { useTranslation } from "react-i18next";
import { useUiStore } from "@/store/uiStore";

/**
 * Renders the footer layout of the application.
 *
 * Show the "status" global state.
 *
 * @return {React.ReactElement} The JSX element representing the footer layout.
 */
export function FooterLayout(): React.ReactElement {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { status } = useUiStore();

  const editorContent = editor?.getText();
  const statistics = count(editorContent ?? "");

  return (
    <AppShellFooter
      px="md"
      className="flex justify-between items-center font-mono text-xs"
    >
      {editorContent?.length ? (
        <div
          className="overlook"
          data-text={`${t("Characters")}: ${statistics.chars}${" "}
            | ${t("Letters")}:${" "}${statistics.letters}${" "}
            | ${t("Words")}: ${statistics.words}${" "}
            | ${t("Lines")}: ${
            statistics.lines > 1
              ? statistics.lines - (statistics.lines - 1) / 2
              : statistics.lines
          }
          `}
        />
      ) : null}
      <div className="ml-auto">{status}</div>
    </AppShellFooter>
  );
}

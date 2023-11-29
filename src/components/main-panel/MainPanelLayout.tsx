import { AppShellMain } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../store/notesStore";
import Editor from "./Editor";

export function MainPanelLayout(): JSX.Element {
  const { t } = useTranslation();
  const { currentNote } = useNotesStore();

  return (
    <AppShellMain>
      {currentNote ? (
        <Editor />
      ) : (
        <div className="absolute my-0 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {t("Welcome")}
        </div>
      )}
    </AppShellMain>
  );
}

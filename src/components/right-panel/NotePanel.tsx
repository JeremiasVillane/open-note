import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../store/notesStore";
import Editor from "./Editor";

export function NotePanel(): JSX.Element {
  const { t } = useTranslation();
  const { currentNote } = useNotesStore();

  return (
    <>
      {currentNote ? (
        <Editor />
      ) : (
        <div className="absolute my-0 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {t("Welcome")}
        </div>
      )}
    </>
  );
}

import { useRichTextEditorContext } from "@mantine/tiptap";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { customControls } from "../../constants";
import { useNotesStore } from "../../store/notesStore";

export function CustomToolbarControls({
  setLeftPanelIsOpened,
}: {
  setLeftPanelIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { currentNote, setCurrentNote, setStatus, setShowNoteForm } =
    useNotesStore();

  return (
    <>
      {customControls(t, editor!, {
        currentNote,
        setCurrentNote,
        setStatus,
        setShowNoteForm,
        setLeftPanelIsOpened,
      }).map((group, index) => {
        return (
          <section
            key={index}
            className={`border overflow-hidden`}
            style={{
              borderRadius: "var(--mantine-radius-default)",
              borderColor: "var(--_root-bd)",
            }}
          >
            {
              // @ts-ignore
              group.map((control: menuControl, index) => {
                return (
                  <button
                    key={index}
                    onClick={control.onClick}
                    title={control.title ?? ""}
                  >
                    <i
                      className={`ri-${control.icon} border-r ${
                        index === group.length - 1 && "border-none"
                      } px-[0.3rem] py-1`}
                      style={{ borderColor: "var(--_root-bd)" }}
                    ></i>
                  </button>
                );
              })
            }
          </section>
        );
      })}
    </>
  );
}

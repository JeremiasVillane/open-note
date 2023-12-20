import { useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { customControls } from "../../constants";
import { useNotesStore } from "../../store/notesStore";
import { useUiStore } from "../../store/uiStore";
import { MenuControl } from "../../types";

/**
 * Renders the custom toolbar controls for the rich text editor.
 *
 * @return {React.ReactElement} The custom toolbar controls.
 */
export function CustomToolbarControls(): React.ReactElement {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { currentNote, setCurrentNote, setShowNewItemForm } = useNotesStore();
  const { setStatus } = useUiStore();

  return (
    <>
      {customControls(t, editor!, {
        currentNote,
        setCurrentNote,
        setStatus,
        setShowNewItemForm,
      }).map((group, index) => {
        return (
          <section
            key={index}
            className="border overflow-hidden"
            style={{
              borderRadius: "var(--mantine-radius-default)",
              borderColor: "var(--_root-bd)",
            }}
          >
            {group.map((control: MenuControl, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    currentNote ? "hover:text-blue-400 active:scale-95" : ""
                  }`}
                  onClick={control.onClick}
                  title={control.title ?? ""}
                  disabled={!currentNote}
                >
                  <i
                    className={`ri-${control.icon} border-r ${
                      index === group.length - 1 && "border-none"
                    } px-[0.3rem] py-1`}
                    style={{ borderColor: "var(--_root-bd)" }}
                  ></i>
                </button>
              );
            })}
          </section>
        );
      })}
    </>
  );
}

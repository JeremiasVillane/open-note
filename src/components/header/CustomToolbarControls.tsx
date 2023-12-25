import { customControls } from "@/constants";
import { useNotesStore } from "@/store/notesStore";
import { useUiStore } from "@/store/uiStore";
import { MenuControl } from "@/types";
import { HtmlToPdf } from "@/utils";
import { useRichTextEditorContext } from "@mantine/tiptap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";

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

  const buttonStyle = {
    className: `${
      currentNote ? "hover:text-blue-400 active:scale-95" : ""
    } border px-[.3rem]`,
    style: {
      borderColor: "var(--_root-bd)",
      borderRadius: "var(--mantine-radius-default)",
    },
  };

  return (
    <section className="flex gap-3">
      {customControls(t, editor!, {
        currentNote,
        setCurrentNote,
        setStatus,
        setShowNewItemForm,
      }).map((group, index) => {
        return (
          <div key={index}>
            {group.map((control: MenuControl, index) => {
              return (
                <button
                  key={index}
                  className={buttonStyle.className}
                  style={buttonStyle.style}
                  onClick={control.onClick}
                  title={control.title ?? ""}
                  disabled={!currentNote}
                >
                  <i className={`ri-${control.icon}`}></i>
                </button>
              );
            })}
          </div>
        );
      })}

      <PDFDownloadLink
        document={<HtmlToPdf content={currentNote?.content} />}
        fileName={`${currentNote?.name}.pdf`}
      >
        <button
          title={t("Export to PDF")}
          className={buttonStyle.className}
          style={buttonStyle.style}
          disabled={!currentNote}
        >
          <i className="ri-file-pdf-2-line" />
        </button>
      </PDFDownloadLink>
    </section>
  );
}

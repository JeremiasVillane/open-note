import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { labels } from "@/lib/labels";
import { useNotesStore } from "@/store/notesStore";
import { CodeBlockIcon } from "@/components/ui/icons";
import { CustomToolbarControls } from "./CustomToolbarControls";

/**
 * Renders the toolbar component for the rich text editor.
 *
 * @return {React.ReactElement} The rendered toolbar component.
 */
export function Toolbar(): React.ReactElement {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { currentNote } = useNotesStore();

  const controls = [
    [
      <RichTextEditor.Bold disabled={!currentNote} />,
      <RichTextEditor.Italic disabled={!currentNote} />,
      <RichTextEditor.Underline disabled={!currentNote} />,
      <RichTextEditor.Strikethrough disabled={!currentNote} />,
      <RichTextEditor.Highlight disabled={!currentNote} />,
      <RichTextEditor.Code disabled={!currentNote} />,
    ],
    [
      <RichTextEditor.H1 disabled={!currentNote} />,
      <RichTextEditor.H2 disabled={!currentNote} />,
      <RichTextEditor.H3 disabled={!currentNote} />,
      <RichTextEditor.H4 disabled={!currentNote} />,
    ],
    [
      <RichTextEditor.BulletList disabled={!currentNote} />,
      <RichTextEditor.OrderedList disabled={!currentNote} />,
      <RichTextEditor.Subscript disabled={!currentNote} />,
      <RichTextEditor.Superscript disabled={!currentNote} />,
    ],
    [
      <RichTextEditor.CodeBlock
        // @ts-ignore
        icon={CodeBlockIcon}
        disabled={!currentNote}
      />,
      <RichTextEditor.Blockquote disabled={!currentNote} />,
      <RichTextEditor.Hr disabled={!currentNote} />,
    ],
    [
      <RichTextEditor.Link disabled={!currentNote} />,
      <RichTextEditor.Unlink disabled={!currentNote} />,
    ],
    [
      <RichTextEditor.AlignLeft disabled={!currentNote} />,
      <RichTextEditor.AlignCenter disabled={!currentNote} />,
      <RichTextEditor.AlignJustify disabled={!currentNote} />,
      <RichTextEditor.AlignRight disabled={!currentNote} />,
    ],
  ];

  return (
    <RichTextEditor editor={editor} labels={labels(t)} className="border-none">
      <RichTextEditor.Toolbar className="border-none">
        <CustomToolbarControls />

        {controls.map((group, index) => {
          return (
            <RichTextEditor.ControlsGroup key={index}>
              {group.map((control, index) => {
                return (
                  <span
                    key={index}
                    className={`${
                      currentNote ? "hover:text-blue-400 active:scale-95" : ""
                    }`}
                  >
                    {control}
                  </span>
                );
              })}
            </RichTextEditor.ControlsGroup>
          );
        })}
      </RichTextEditor.Toolbar>
    </RichTextEditor>
  );
}

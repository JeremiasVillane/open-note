import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { labels } from "../../lib/labels";
import { useNotesStore } from "../../store/notesStore";
import { CodeBlockIcon } from "../ui/icons";
import { CustomToolbarControls } from "./CustomToolbarControls";

export function Toolbar() {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();
  const { currentNote } = useNotesStore();

  return (
    <RichTextEditor editor={editor} labels={labels(t)} className="border-none">
      <RichTextEditor.Toolbar className="border-none">
        <CustomToolbarControls />

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold disabled={!currentNote} />
          <RichTextEditor.Italic disabled={!currentNote} />
          <RichTextEditor.Underline disabled={!currentNote} />
          <RichTextEditor.Strikethrough disabled={!currentNote} />
          <RichTextEditor.Highlight disabled={!currentNote} />
          <RichTextEditor.Code disabled={!currentNote} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 disabled={!currentNote} />
          <RichTextEditor.H2 disabled={!currentNote} />
          <RichTextEditor.H3 disabled={!currentNote} />
          <RichTextEditor.H4 disabled={!currentNote} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList disabled={!currentNote} />
          <RichTextEditor.OrderedList disabled={!currentNote} />
          <RichTextEditor.Subscript disabled={!currentNote} />
          <RichTextEditor.Superscript disabled={!currentNote} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.CodeBlock
            // @ts-ignore
            icon={CodeBlockIcon}
            disabled={!currentNote}
          />
          <RichTextEditor.Blockquote disabled={!currentNote} />
          <RichTextEditor.Hr disabled={!currentNote} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link disabled={!currentNote} />
          <RichTextEditor.Unlink disabled={!currentNote} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft disabled={!currentNote} />
          <RichTextEditor.AlignCenter disabled={!currentNote} />
          <RichTextEditor.AlignJustify disabled={!currentNote} />
          <RichTextEditor.AlignRight disabled={!currentNote} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
    </RichTextEditor>
  );
}

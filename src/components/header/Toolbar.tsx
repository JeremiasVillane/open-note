import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useTranslation } from "react-i18next";
import { labels } from "../../lib/labels";
import { CodeBlockIcon } from "../ui/icons";
import { CustomToolbarControls } from "./CustomToolbarControls";

export function Toolbar() {
  const { t } = useTranslation();
  const { editor } = useRichTextEditorContext();

  return (
    <RichTextEditor editor={editor} labels={labels(t)} className="border-none">
      <RichTextEditor.Toolbar className="border-none">
        <CustomToolbarControls />

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          {/* @ts-ignore */}
          <RichTextEditor.CodeBlock icon={CodeBlockIcon} />
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
    </RichTextEditor>
  );
}

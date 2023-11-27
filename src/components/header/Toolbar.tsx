import { RichTextEditor } from "@mantine/tiptap";
import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction } from "react";
import { CustomToolbarControls } from "./CustomToolbarControls";

export function Toolbar({
  editor,
  setLeftPanelIsOpened,
}: {
  editor: Editor;
  setLeftPanelIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <RichTextEditor editor={editor} className="border-none">
      <RichTextEditor.Toolbar className="border-none">
        <RichTextEditor.ControlsGroup>
          <CustomToolbarControls
            editor={editor}
            setLeftPanelIsOpened={setLeftPanelIsOpened}
          />
        </RichTextEditor.ControlsGroup>

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
          <RichTextEditor.CodeBlock />
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

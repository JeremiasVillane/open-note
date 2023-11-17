import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNotesStore } from "../../store/notesStore";
import { useEffect } from "react";

export default function Editor() {
  const { currentNote, setCurrentNote, saved, setSaved } = useNotesStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: currentNote?.content,
  });

  useEffect(() => {
    if (!currentNote || !editor || editor.isDestroyed) {
      return;
    }

    if (!editor.isFocused || !editor.isEditable) {
      queueMicrotask(() => {
        const currentSelection = editor?.state.selection;
        editor
          ?.chain()
          .setContent(currentNote?.content)
          .setTextSelection(currentSelection!)
          .run();
      });
    }
  }, [editor, editor?.isEditable, editor?.isFocused, currentNote]);

  return (
    <RichTextEditor
      className="h-[calc(100vh-7.3rem)] mt-6 overflow-auto border-none"
      editor={editor}
      onLoad={() => {
        setCurrentNote({
          ...currentNote,
          name: currentNote?.name ?? "",
          content: editor?.getHTML() ?? "",
        });
      }}
      onChange={() => {
        setCurrentNote({
          ...currentNote,
          name: currentNote?.name ?? "",
          content: editor?.getHTML() ?? "",
        });
      }}
    >
      <RichTextEditor.Toolbar sticky stickyOffset={0}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
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
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
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

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

// import { writeTextFile } from "@tauri-apps/api/fs";
// import { documentDir, join } from "@tauri-apps/api/path";
// import {
//   LinkBubbleMenu,
//   RichTextEditor,
//   TableBubbleMenu,
//   type RichTextEditorRef,
// } from "mui-tiptap";
// import { useEffect, useRef, useState } from "react";
// import { toast } from "react-hot-toast";
// import { useNotesStore } from "../../store/notesStore";
// import EditorMenuControls from "./EditorMenuControls";
// import useExtensions from "./useExtensions";

// export default function Editor({
//   togglePaletteMode,
// }: {
//   togglePaletteMode: () => void;
// }): JSX.Element {
//   const { currentNote, setCurrentNote, saved, setSaved } = useNotesStore();
//   const [text, setText] = useState<string>("");
//   const rteRef = useRef<RichTextEditorRef>(null);
//   const editor = rteRef.current?.editor;
//   const extensions = useExtensions({
//     placeholder: "Start typing...",
//   });

//   useEffect(() => {
//     setText(currentNote?.content ?? "");
//   }, [currentNote]);

//   useEffect(() => {
//     if (!currentNote || !editor || editor.isDestroyed) {
//       return;
//     }

//     if (!editor.isFocused || !editor.isEditable) {
//       setText(currentNote?.content ?? "");

//       queueMicrotask(() => {
//         const currentSelection = editor?.state.selection;
//         editor
//           ?.chain()
//           .setContent(currentNote?.content)
//           .setTextSelection(currentSelection!)
//           .run();
//       });
//     }
//   }, [text, editor, editor?.isEditable, editor?.isFocused, currentNote]);

//   const handleSave = async () => {
//     const documentPath = await documentDir();
//     const filePath = await join(
//       documentPath,
//       "open-note",
//       `${currentNote?.name}.html`
//     );

//     await writeTextFile(filePath, editor?.getHTML() ?? "");

//     setSaved(true);

//     setCurrentNote({
//       ...currentNote,
//       name: currentNote?.name ?? "",
//       content: text,
//     });

//     toast.success("Note saved", {
//       duration: 2000,
//       position: "bottom-right",
//       style: {
//         background: "#333",
//         color: "#fff",
//       },
//     });
//   };

//   return (
//     <RichTextEditor
//       className="flex-1"
//       ref={rteRef}
//       extensions={extensions}
//       content={currentNote?.content ?? ""}
//       RichTextFieldProps={{
//         variant: "standard",
//       }}
//       editable={true}
//       renderControls={() => (
//         <EditorMenuControls
//           togglePaletteMode={togglePaletteMode}
//           handleSave={handleSave}
//           saved={saved}
//         />
//       )}
//       onCreate={() => {
//         const content = editor?.getHTML() ?? "";
//         setText(content);
//         setSaved(true);
//       }}
//       onUpdate={() => {
//         const content = editor?.getHTML() ?? "";
//         setText(content);
//         setSaved(false);

//         setCurrentNote({
//           ...currentNote,
//           name: currentNote?.name ?? "",
//           content,
//         });
//       }}
//     >
//       {() => (
//         <>
//           <LinkBubbleMenu />
//           <TableBubbleMenu />
//         </>
//       )}
//     </RichTextEditor>
//   );
// }

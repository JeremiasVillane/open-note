import { Editor } from "@tiptap/react";
import { NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";

export function NoteList({ editor }: { editor: Editor }): JSX.Element {
  const { notesNames } = useNotesStore();

  return (
    <section>
      {notesNames.map((noteName) => (
        <NoteItem key={noteName} noteName={noteName} editor={editor} />
      ))}
    </section>
  );
}

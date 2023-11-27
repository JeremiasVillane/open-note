import { NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";

export function NoteList(): JSX.Element {
  const { notesNames } = useNotesStore();

  return (
    <section>
      {notesNames.map((noteName) => (
        <NoteItem key={noteName} noteName={noteName} />
      ))}
    </section>
  );
}

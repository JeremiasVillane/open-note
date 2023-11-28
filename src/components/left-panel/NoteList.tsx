import { NoteItem } from "..";
import { useNotesStore } from "../../store/notesStore";
import { FileObj } from "../../types";

export function NoteList(): JSX.Element {
  const { fileList }: {fileList: FileObj[]} = useNotesStore();

  return (
    <section>
      {fileList.map((file) => (
        <NoteItem key={file.id} noteName={file.name} />
      ))}
    </section>
  );
}

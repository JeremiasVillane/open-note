import { Box } from "@mui/material";
import { useNotesStore } from "../../store/notesStore";
import Editor from "./Editor";

export function NotePanel(): JSX.Element {
  const { currentNote } = useNotesStore();

  return (
    <>
      {currentNote ? (
        <Box className="overflow-y-auto">
          <Editor />
        </Box>
      ) : (
        <div className="absolute my-0 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Select a note to edit
        </div>
      )}
    </>
  );
}

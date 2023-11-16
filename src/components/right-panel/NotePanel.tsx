import { Box } from "@mui/material";
import { useNotesStore } from "../../store/notesStore";
import Editor from "./Editor";

export function NotePanel({
  togglePaletteMode,
}: {
  togglePaletteMode: () => void;
}): JSX.Element {
  const { currentNote } = useNotesStore();

  return (
    <>
      {currentNote ? (
        <Box className="flex flex-col h-screen overflow-y-auto">
          <Editor togglePaletteMode={togglePaletteMode} />
        </Box>
      ) : (
        <div className="absolute my-0 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Select a note to edit
        </div>
      )}
    </>
  );
}

import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { NoteEditor, NoteForm, NoteList } from "./components";

export default function App() {
  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(
    systemSettingsPrefersDarkMode ? "dark" : "light"
  );
  const togglePaletteMode = useCallback(
    () =>
      setPaletteMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          secondary: {
            main: "#42B81A",
          },
        },
      }),
    [paletteMode]
  );

  useEffect(() => {
    async function createNotesDir() {
      await createDir("open-note", {
        dir: BaseDirectory.Document,
        recursive: true,
      });
    }

    createNotesDir();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main className="h-screen text-white grid grid-cols-12 overflow-hidden">
        <section
          id="left-panel"
          className={`col-span-3 ${
            paletteMode === "light" ? "bg-gray-100" : "bg-neutral-950"
          }`}
        >
          <NoteForm />
          <NoteList />
        </section>

        <Box
          className={`relative col-span-9 ${
            paletteMode === "light" ? " text-black" : "text-white"
          }`}
        >
          <NoteEditor togglePaletteMode={togglePaletteMode} />
        </Box>

        <Toaster />
      </main>
    </ThemeProvider>
  );
}

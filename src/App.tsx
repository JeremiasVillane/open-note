import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { NoteForm, NoteList, NotePanel } from "./components";

export default function App(): JSX.Element {
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

      <Grid container>
        <Grid
          item
          xs={3}
          className={`h-screen border-r-[1.5px] resize-x ${
            paletteMode === "light" ? "border-gray-300" : "border-[#2f2f2f]"
          }`}
        >
          <NoteForm />
          <NoteList />
        </Grid>

        <Grid item xs={9}>
          <Box>
            <NotePanel togglePaletteMode={togglePaletteMode} />
          </Box>
        </Grid>
      </Grid>

      <Toaster />
    </ThemeProvider>
  );
}

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
// import '@mantine/code-highlight/styles.css';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "remixicon/fonts/remixicon.css";
import "../styles/globals.css";
// import { ModalsProvider } from "@mantine/modals";
// import { Notifications } from "@mantine/notifications";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { extensions } from "../lib/extensions";
import { useNotesStore } from "../store/notesStore";
import { useMinWidth } from "../utils";
import { TauriProvider } from "./tauri-provider";

export default function Providers({ children }: { children: JSX.Element }) {
  const { currentNote } = useNotesStore();

  const editor = useEditor({
    extensions,
    content: currentNote?.content,
  });

  useMinWidth(1000);

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        {/* <ModalsProvider> */}
        <TauriProvider>
          {/* <Notifications /> */}
          <RichTextEditor editor={editor} className="border-none">
            {children}
          </RichTextEditor>
        </TauriProvider>
        {/* </ModalsProvider> */}
      </MantineProvider>
    </>
  );
}

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
import { TauriProvider } from "./tauri-provider";
// import { useState } from "react";
// import Splashscreen from "./Splashscreen";

export default function Providers({ children }: { children: JSX.Element }) {
  const { currentNote } = useNotesStore();
  // const [isLoading, setLoading] = useState(false);

  const editor = useEditor({
    extensions,
    content: currentNote?.content,
  });

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
          {/* {isLoading ? <Splashscreen /> : children} */}
        </TauriProvider>
        {/* </ModalsProvider> */}
      </MantineProvider>
    </>
  );
}

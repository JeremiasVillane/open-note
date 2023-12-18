import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
// import '@mantine/code-highlight/styles.css';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "remixicon/fonts/remixicon.css";
import "../styles/globals.css";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { extensions } from "../lib/extensions";
import { useNotesStore } from "../store/notesStore";
import HotkeysProvider from "./hotkeys-provider";
import { TauriProvider } from "./tauri-provider";

/**
 * Renders the Providers component.
 *
 * @param {JSX.Element} children - The JSX element representing the children of Providers.
 * @return {JSX.Element}
 */
export default function Providers({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { currentNote } = useNotesStore();

  const editor = useEditor({
    extensions,
    content: currentNote?.content,
  });

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <RichTextEditor editor={editor} className="border-none">
          <TauriProvider>
            <HotkeysProvider>{children}</HotkeysProvider>
          </TauriProvider>
        </RichTextEditor>
      </MantineProvider>
    </>
  );
}

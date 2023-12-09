import { Extension } from "@tiptap/core";
import { readText } from "@tauri-apps/api/clipboard";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    clipBoard: {
      /**
       * cut selection
       */
      cut: () => ReturnType;
      /**
       * copy selection
       */
      copy: () => ReturnType;
      /**
       * paste selection
       */
      paste: () => ReturnType;
    };
  }
}

export const ClipBoard = Extension.create({
  name: "clipBoard",

  // solution https://github.com/ueberdosis/tiptap/discussions/802
  // document.execCommand is deprecated https://github.com/ueberdosis/tiptap/discussions/3129
  // while document.execCommand is deprecated, there is no viable replacement https://stackoverflow.com/a/70831583
  // the new async clipboard API does not support cut, only read and write https://developer.mozilla.org/en-US/docs/Web/API/Clipboard

  addCommands() {
    return {
      cut: () => () => {
        document.execCommand("cut");
        return true;
      },
      copy: () => () => {
        document.execCommand("copy");
        return true;
      },
      paste:
        () =>
        ({ editor }) => {
          readText()
            .then((text) => {
              editor?.commands.insertContent(text);
            })
            .catch((error) => {
              console.error("Error pasting text: ", error);
            });
          return true;
        },
    };
  },
});

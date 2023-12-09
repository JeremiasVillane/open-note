import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { ClipBoard } from "./clipboard";

const CustomSubscript = SubScript.extend({
  excludes: "superscript",
});

const CustomSuperscript = Superscript.extend({
  excludes: "subscript",
});

export const extensions = [
  StarterKit,
  Underline,
  Link,
  CustomSuperscript,
  CustomSubscript,
  Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  ClipBoard,
];

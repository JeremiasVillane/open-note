import { TFunction } from "i18next";

export const labels = (t: TFunction<"translation", undefined>) => {
  return {
    // Primary formatting
    boldControlLabel: t("Bold"),
    italicControlLabel: t("Italic"),
    underlineControlLabel: t("Underline"),
    strikeControlLabel: t("Strikethrough"),
    highlightControlLabel: t("Highlight"),
    codeControlLabel: t("Code"),

    // Secondary formatting
    bulletListControlLabel: t("Bullet list"),
    orderedListControlLabel: t("Ordered list"),
    subscriptControlLabel: t("Subscript"),
    superscriptControlLabel: t("Superscript"),

    // Heading
    h1ControlLabel: t("Heading 1"),
    h2ControlLabel: t("Heading 2"),
    h3ControlLabel: t("Heading 3"),
    h4ControlLabel: t("Heading 4"),

    // Block
    codeBlockControlLabel: t("Code block"),
    blockquoteControlLabel: t("Blockquote"),
    hrControlLabel: t("Separator"),

    // Link
    linkControlLabel: t("Link"),
    unlinkControlLabel: t("Remove link"),
    linkEditorInputLabel: t("Enter URL"),
    linkEditorInputPlaceholder: t("Link URL"),
    linkEditorSave: t("Save"),

    // Align
    alignLeftControlLabel: t("Align left"),
    alignCenterControlLabel: t("Align center"),
    alignRightControlLabel: t("Align right"),
    alignJustifyControlLabel: t("Justify text"),
  };
};

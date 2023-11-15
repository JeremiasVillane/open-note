import { Save } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material";
import {
  MenuButton,
  MenuButtonAddTable,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonHorizontalRule,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  isTouchDevice,
} from "mui-tiptap";

export default function EditorMenuControls({
  togglePaletteMode,
  handleSave,
  saved,
}: {
  togglePaletteMode: () => void;
  handleSave: () => void;
  saved: boolean;
}): JSX.Element {
  const theme = useTheme();

  return (
    <MenuControlsContainer>
      <MenuButton
        value="save"
        tooltipLabel="Save note"
        size="small"
        onClick={handleSave}
        disabled={saved}
        IconComponent={Save}
      />
      <MenuDivider />

      <MenuSelectHeading />

      <MenuDivider />

      <MenuSelectFontSize />

      <MenuDivider />

      <MenuButtonBold />

      <MenuButtonItalic />

      <MenuButtonUnderline />

      <MenuButtonStrikethrough />

      <MenuButtonSubscript />

      <MenuButtonSuperscript />

      <MenuDivider />

      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
      />

      <MenuButtonHighlightColor
        swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      />

      <MenuDivider />

      <MenuButtonEditLink />

      <MenuDivider />

      <MenuSelectTextAlign />

      <MenuDivider />

      <MenuButtonOrderedList />

      <MenuButtonBulletedList />

      <MenuButtonTaskList />

      {isTouchDevice() && (
        <>
          <MenuButtonIndent />

          <MenuButtonUnindent />
        </>
      )}

      <MenuDivider />

      <MenuButtonBlockquote />

      <MenuDivider />

      <MenuButtonCode />

      <MenuButtonCodeBlock />

      <MenuDivider />

      {/* <MenuButtonImageUpload
        onUploadFiles={(
          files: File[]
        ): ImageNodeAttributes[] | Promise<ImageNodeAttributes[]> => {
          const base64Images = files.map((file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
            });
          });

          const result: ImageNodeAttributes[] = [];

          Promise.all(base64Images).then((base64ImageArray) => {
            base64ImageArray.map((base64Image: any) =>
              result.push({
                src: base64Image,
                alt: "",
              })
            );
          });

          return result;
        }}
      /> */}

      <MenuButtonHorizontalRule />

      <MenuButtonAddTable />

      <MenuDivider />

      <MenuButtonUndo />
      <MenuButtonRedo />

      <MenuDivider />

      <MenuButton
        value="toggle-dark-mode"
        tooltipLabel="Toggle dark/light mode"
        size="small"
        onClick={togglePaletteMode}
        IconComponent={
          theme.palette.mode === "dark" ? Brightness7Icon : Brightness4Icon
        }
      />
    </MenuControlsContainer>
  );
}

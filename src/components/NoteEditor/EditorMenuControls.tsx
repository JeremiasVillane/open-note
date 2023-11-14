import { Close, Save } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material";
import {
  MenuButton,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
} from "mui-tiptap";

export default function EditorMenuControls({
  togglePaletteMode,
  handleSave,
  handleClose,
  saved,
}: {
  togglePaletteMode: () => void;
  handleSave: () => void;
  handleClose: () => void;
  saved: boolean;
}) {
  const theme = useTheme();

  return (
    <MenuControlsContainer className="flex justify-between items-center">
      <div id="menu-controls" className="flex justify-center items-center">
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
        <MenuButtonBold />
        <MenuButtonItalic />
        <MenuDivider />
        <MenuButtonUndo />
        <MenuButtonRedo />
      </div>
      <div id="menu-actions">
        <MenuButton
          value="toggle-dark-mode"
          tooltipLabel="Toggle dark/light mode"
          size="small"
          onClick={togglePaletteMode}
          IconComponent={
            theme.palette.mode === "dark" ? Brightness7Icon : Brightness4Icon
          }
        />
        <MenuButton
          value="close"
          tooltipLabel="Close note"
          size="small"
          onClick={handleClose}
          IconComponent={Close}
        />
      </div>
    </MenuControlsContainer>
  );
}

import { useMantineColorScheme } from "@mantine/core";
import EditMenu from "./EditMenu";
import FileMenu from "./FileMenu";
import HelpMenu from "./HelpMenu";

export default function TitleBarMenuBar() {
  const { colorScheme } = useMantineColorScheme();

  const menuItemStyles = `cursor-default ${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;
  const menuTitleStyles = `overlook py-1 px-2 rounded-sm ${menuItemStyles}`;

  return (
    <>
      <FileMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
      />

      <EditMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
      />

      <HelpMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
      />
    </>
  );
}

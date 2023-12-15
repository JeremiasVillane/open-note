import { TransitionProps, useMantineColorScheme } from "@mantine/core";
import EditMenu from "./EditMenu";
import FileMenu from "./FileMenu";
import HelpMenu from "./HelpMenu";

/**
 * Renders the title bar menu bar component.
 *
 * @return {JSX.Element} The rendered title bar menu bar component.
 */
export default function TitleBarMenuBar(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();

  const menuItemStyles = `cursor-default ${
    colorScheme === "dark" ? "hover:bg-[#383838]" : "hover:bg-gray-200"
  } transition-colors ease-in-out`;

  const menuTitleStyles = `overlook py-1 px-2 rounded-sm ${menuItemStyles}`;

  const transitionProps: Partial<Omit<TransitionProps, "mounted">> = {
    transition: "fade",
    duration: 1,
  };

  return (
    <>
      <FileMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
        transitionProps={transitionProps}
      />

      <EditMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
        transitionProps={transitionProps}
      />

      <HelpMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
        transitionProps={transitionProps}
      />
    </>
  );
}

import { TransitionProps, useMantineColorScheme } from "@mantine/core";
import EditMenu from "./EditMenu";
import FileMenu from "./FileMenu";
import HelpMenu from "./HelpMenu";

/**
 * Renders the title bar menu bar component.
 *
 * @param {object} props - The props object.
 * @param {boolean} props.open - Indicates whether the menu is open.
 * @param {function} props.setOpen - A function to set the state of the open prop.
 * @param {object} props.transitionProps - Menu transition props.
 * @returns {JSX.Element} The rendered component.
 */
export default function TitleBarMenuBar({
  open,
  setOpen,
  transitionProps,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transitionProps: Partial<Omit<TransitionProps, "mounted">>;
}): JSX.Element {
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
        transitionProps={transitionProps}
        open={open}
        setOpen={setOpen}
      />

      <EditMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
        transitionProps={transitionProps}
        open={open}
        setOpen={setOpen}
      />

      <HelpMenu
        menuItemStyles={menuItemStyles}
        menuTitleStyles={menuTitleStyles}
        transitionProps={transitionProps}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

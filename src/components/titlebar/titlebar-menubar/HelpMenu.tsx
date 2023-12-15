import { Menu, Text, TransitionProps, UnstyledButton } from "@mantine/core";
import { useTranslation } from "react-i18next";

/**
 * Renders a help menu component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.menuItemStyles - The styles for menu items.
 * @param {string} props.menuTitleStyles - The styles for menu title.
 * @param {Partial<Omit<TransitionProps, "mounted">>} props.transitionProps - The transition props.
 * @param {boolean} props.open - Indicates if the menu is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpen - Function to set the open state.
 * @return {JSX.Element} The rendered help menu.
 */
export default function HelpMenu({
  menuItemStyles,
  menuTitleStyles,
  transitionProps,
  open,
  setOpen,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
  transitionProps: Partial<Omit<TransitionProps, "mounted">>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { t } = useTranslation();

  return (
    <Menu
      trigger={open ? "hover" : "click"}
      transitionProps={transitionProps}
      position="bottom-start"
      shadow="md"
      width={150}
      offset={3}
    >
      <Menu.Target>
        <UnstyledButton
          className="cursor-default"
          onClick={() => setOpen(!open)}
        >
          <Text
            inline
            size="sm"
            className={menuTitleStyles}
            data-text={t("Help")}
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="shadow-lg">
        <Menu.Item onClick={() => null} className={menuItemStyles}>
          <Text inline size="sm" className="overlook" data-text={t("About")} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

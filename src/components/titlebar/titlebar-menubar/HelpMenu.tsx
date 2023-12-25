import { Menu, Text, UnstyledButton } from "@mantine/core";
import { Suspense, lazy, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { renderModal } from "@/helpers";
import TitleBarContext from "@/providers/titlebar-provider";
import { useUiStore } from "@/store/uiStore";

const MenuDropdown = lazy(() =>
  import("@mantine/core").then((module) => ({ default: module.Menu.Dropdown }))
);

/**
 * Renders a help menu component.
 *
 * @param {Object} props - The props object.
 * @param {string} props.menuItemStyles - The styles for menu items.
 * @param {string} props.menuTitleStyles - The styles for menu title.
 * @param {Partial<Omit<TransitionProps, "mounted">>} props.transitionProps - The transition props.
 * @param {boolean} props.open - Indicates if the menu is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpen - Function to set the open state.
 * @return {React.ReactElement} The rendered help menu.
 */
export default function HelpMenu({
  menuItemStyles,
  menuTitleStyles,
}: {
  menuItemStyles: string;
  menuTitleStyles: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const { setActiveModal } = useUiStore();
  const { openMenu, setOpenMenu, transitionProps } =
    useContext(TitleBarContext);
  const [opened, setOpened] = useState(false);

  return (
    <Menu
      trigger={openMenu ? "hover" : "click"}
      transitionProps={transitionProps}
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      shadow="md"
      width={150}
      offset={1}
    >
      <Menu.Target>
        <UnstyledButton
          className="cursor-default"
          onClick={() => {
            setOpenMenu(!openMenu);
            setOpened(!opened);
          }}
        >
          <Text
            inline
            size="sm"
            className={menuTitleStyles}
            data-text={t("Help")}
          />
        </UnstyledButton>
      </Menu.Target>

      <Suspense>
        <MenuDropdown className="shadow-lg" onClick={() => setOpenMenu(false)}>
          <Menu.Item
            onClick={() =>
              renderModal({
                label: "about",
                width: 300,
                height: 275,
                setActiveModal,
              })
            }
            className={menuItemStyles}
          >
            <Text
              inline
              size="sm"
              className="overlook"
              data-text={t("About")}
            />
          </Menu.Item>
        </MenuDropdown>
      </Suspense>
    </Menu>
  );
}

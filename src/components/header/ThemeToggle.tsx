import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { MoonIcon, SunIcon } from "../ui/icons";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      id="toggle-theme"
      title={`
            ${t("Dark/Light Theme")}
          Ctrl + J
            `}
      variant="default"
      className={"border-none hoverStyles"}
      onClick={() => toggleColorScheme()}
      size={30}
    >
      {colorScheme === "dark" ? <MoonIcon /> : <SunIcon />}
    </ActionIcon>
  );
}

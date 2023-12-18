import { useMantineColorScheme } from "@mantine/core";
import { useContext } from "react";
import TitleBarContext from "../../providers/titlebar-provider";
import TitleBarButtons from "./TitleBarButtons";
import TitleBarIconMenu from "./TitleBarIconMenu";
import TitleBarName from "./TitleBarName";
import TitleBarMenuBar from "./titlebar-menubar/TitleBarMenuBar";

/**
 * Renders the Titlebar component,
 * containing the icon menu, menu bar, window name and window controls.
 *
 * @return {JSX.Element} The rendered Titlebar component.
 */
export function Titlebar({ modal }: { modal?: string }): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const { setOpenMenu } = useContext(TitleBarContext);

  return (
    <section
      id="titlebar"
      className="h-[var(--titlebar-height)] flex justify-between fixed select-none top-0 left-0 right-0 z-[999]"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "var(--mantine-color-dark-8)"
            : "var(--mantine-color-gray-1)",
        border: modal ? "1px solid var(--mantine-color-gray-light)" : "",
        borderBottom: "none",
      }}
      data-tauri-drag-region
    >
      {!modal ? (
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setOpenMenu(false)}
        >
          <TitleBarIconMenu />

          <TitleBarMenuBar />
        </div>
      ) : null}

      <TitleBarName modal={modal} />

      <TitleBarButtons modal={modal ? true : false} />
    </section>
  );
}

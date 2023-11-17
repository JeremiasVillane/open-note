import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
// import '@mantine/code-highlight/styles.css';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { TauriProvider } from "./tauri-provider";
// import { useState } from "react";
// import Splashscreen from "./Splashscreen";

export default function Providers({ children }: { children: JSX.Element }) {
  // const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" withCssVariables>
        <ModalsProvider>
          <TauriProvider>
            <Notifications />
            {children}
            {/* {isLoading ? <Splashscreen /> : children} */}
          </TauriProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

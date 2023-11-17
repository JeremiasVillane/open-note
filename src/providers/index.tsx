import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
// import '@mantine/code-highlight/styles.css';
// import "@fontsource/open-sans";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { TauriProvider } from "./tauri-provider";
// import { useState } from "react";
// import { BrowserRouter } from 'react-router-dom';
// import Splashscreen from "./Splashscreen";

export default function Providers({ children }: { children: JSX.Element }) {
  // const [isLoading, setLoading] = useState(false);

  // const theme = createTheme({
  //   fontFamily:
  //     "-apple-system, BlinkMacSystemFont, Segoe UI Variable Text, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  //   fontFamilyMonospace:
  //     "source-code-pro, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  //   components: {
  //     Checkbox: {
  //       styles: { input: { cursor: "pointer" }, label: { cursor: "pointer" } },
  //     },
  //     TextInput: { styles: { label: { marginTop: "0.5rem" } } },
  //     Select: { styles: { label: { marginTop: "0.5rem" } } },
  //     Loader: { defaultProps: { size: "xl" } },
  //     Space: { defaultProps: { h: "sm" } },
  //     Anchor: { defaultProps: { target: "_blank" } },
  //     Burger: { styles: { burger: { color: "--mantine-color-grey-6" } } },
  //   },
  // });

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" withCssVariables>
        <ModalsProvider>
          {/* <BrowserRouter> */}
          <TauriProvider>
          <Notifications />
          {children}
          {/* {isLoading ? <Splashscreen /> : children} */}
          </TauriProvider>
          {/* </BrowserRouter> */}
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

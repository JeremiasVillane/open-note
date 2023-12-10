import { AppShell } from "@mantine/core";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
} from "./components";
import { useNotesStore } from "./store/notesStore";
import "./styles/App.css";

export default function App(): JSX.Element {
  const { leftPanelIsClosed } = useNotesStore();

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 33 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: {
          mobile: leftPanelIsClosed,
          desktop: leftPanelIsClosed,
        },
      }}
      className="overflow-hidden select-none"
    >
      <MainPanelLayout />

      <HeaderLayout />

      <LeftPanelLayout />

      <FooterLayout />
    </AppShell>
  );
}

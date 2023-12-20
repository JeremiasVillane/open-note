import { AppShell } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter, Route, Routes } from "react-router-dom";
import {
  FooterLayout,
  HeaderLayout,
  LeftPanelLayout,
  MainPanelLayout,
  Titlebar,
} from "@/components";
import { About, ModalLayout } from "@/components/ui/modals";
import { APP_NAME } from "@/constants";
import { TitleBarProvider } from "@/providers/titlebar-provider";
import { useUiStore } from "@/store/uiStore";
import "@/styles/App.css";
import { ModalType } from "@/types";

/**
 * Renders the routes for the main application.
 *
 * The base route represents the main layout: includes the custom titlebar, a dynamic sidebar that can be resized, as well as header, main panel, and footer layouts.
 *
 * The rest of the routes represent modals.
 *
 * Sidebar resizing logic based partially on: https://codereview.stackexchange.com/questions/263970/react-based-resizable-sidebar
 *
 * @return {React.ReactElement}
 */
export default function AppRoutes(): React.ReactElement {
  const { t } = useTranslation();
  const { leftPanelIsClosed, setLeftPanelIsClosed } = useUiStore();
  const { ref, width } = useElementSize();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Sidebar resizing logic
  const sidebarSize = { min: 150, max: width / 2 };

  const [sidebarState, updateSidebarState] = useReducer(
    (prev: { width: number }, next: { width: number }) => {
      const newState = { ...prev, ...next };

      if (newState.width > sidebarSize.max) {
        newState.width = sidebarSize.max;
      }

      if (newState.width < sidebarSize.min) {
        setLeftPanelIsClosed(true);
        newState.width = sidebarSize.min;
      }

      return newState;
    },
    {
      width: 200,
    }
  );

  const startResizing = useCallback(() => {
    setIsResizing(true);

    const root = document.getElementById("root");
    if (root) {
      root.style.setProperty("cursor", "col-resize");
    }
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);

    const root = document.getElementById("root");
    if (root) {
      root.style.setProperty("cursor", "default");
    }
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        // Calculate the new width of the sidebar by subtracting the left position
        // of the mouse event from the left position of the sidebarRef element
        updateSidebarState({
          width:
            event.clientX - sidebarRef.current.getBoundingClientRect().left,
        });
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // Modals data
  const modals: ModalType[] = [
    {
      path: "/about",
      title: "About",
      type: "info",
      content: <About />,
      modalProps: {
        icon: { style: { paddingLeft: "0" } },
        buttons: { display: false },
      },
    },
    {
      path: "/discard",
      title: APP_NAME,
      type: "warning",
      content: t("ConfirmDiscardChanges"),
    },
    {
      path: "/delete-note",
      title: APP_NAME,
      type: "warning",
      content: t("ConfirmDeleteNote"),
    },
    {
      path: "/delete-folder",
      title: APP_NAME,
      type: "warning",
      content: t("ConfirmDeleteFolder"),
    },
  ];

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TitleBarProvider>
                <Titlebar />
              </TitleBarProvider>

              <AppShell
                ref={ref}
                header={{ height: "var(--header-height)" }}
                footer={{ height: "var(--footer-height)" }}
                className="overflow-hidden select-none flex flex-row"
              >
                {!leftPanelIsClosed ? (
                  <LeftPanelLayout
                    sidebarRef={sidebarRef}
                    sidebarSize={sidebarSize}
                    sidebarWidth={sidebarState.width}
                    isResizing={isResizing}
                    startResizing={startResizing}
                  />
                ) : null}

                <MainPanelLayout />

                <HeaderLayout />

                <FooterLayout />
              </AppShell>
            </>
          }
        />

        {modals.map((modal, index) => {
          return (
            <Route
              key={index}
              path={modal.path}
              element={
                <>
                  <TitleBarProvider>
                    <Titlebar modal={modal.title} />
                  </TitleBarProvider>

                  <div className="overflow-hidden select-none">
                    <ModalLayout
                      type={modal.type}
                      content={modal.content}
                      modalProps={modal.modalProps}
                    />
                  </div>
                </>
              }
            />
          );
        })}
      </Routes>
    </HashRouter>
  );
}

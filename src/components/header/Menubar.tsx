import { useMantineColorScheme } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { menuControls } from "../../constants";
import { useNotesStore } from "../../store/notesStore";
import { Dispatch, SetStateAction } from "react";

export function Menubar({
  editor,
  setLeftPanelIsOpened,
}: {
  editor: Editor;
  setLeftPanelIsOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { currentNote, setCurrentNote, setStatus, setShowNoteForm } =
    useNotesStore();

  return (
    <div className="flex gap-2 px-4 fixed z-10 ml-6 text-lg">
      {menuControls(t, editor, {
        currentNote,
        setCurrentNote,
        setStatus,
        setShowNoteForm,
        setLeftPanelIsOpened,
      }).map((group, index) => {
        return (
          <div
            key={index}
            className={`flex gap-2 ml-1 px-2 border rounded-lg ${
              colorScheme === "dark" && "border-gray-700"
            }`}
          >
            {
              // @ts-ignore
              group.map((control: menuControl, index) => {
                return (
                  <button
                    key={index}
                    onClick={control.onClick}
                    title={control.title ?? ""}
                  >
                    <i
                      className={`ri-${control.icon} ${control.isActive} hover:text-indigo-600 transition-colors ease-in-out duration-150`}
                    ></i>
                  </button>
                );
              })
            }
          </div>
        );
      })}
    </div>
  );
}

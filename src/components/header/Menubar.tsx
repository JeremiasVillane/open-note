import { useMantineColorScheme } from "@mantine/core";
import { Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { menuControls } from "../../constants";
import { useNotesStore } from "../../store/notesStore";

export default function Menubar({ editor }: { editor: Editor }) {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const { currentNote, setCurrentNote, setStatus } = useNotesStore();

  return (
    <div className="flex gap-2 px-4 fixed z-10 ml-6 text-lg">
      {menuControls(t, editor, { currentNote, setCurrentNote, setStatus }).map(
        (group, index) => {
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
                        className={`ri-${control.icon} ${control.isActive} hover:text-gray-600`}
                      ></i>
                    </button>
                  );
                })
              }
            </div>
          );
        }
      )}
    </div>
  );
}

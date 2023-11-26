import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const defaultLng = "en";
const resources = {
  en: {
    translations: {
      // ***** UI
      Placeholder: "Write a new note",
      Welcome: "Select a note to edit",
      About:
        "This is a desktop app powered by Tauri. Using React/Typescript and Rust.",

      // ***** Statusbar
      NoteCreated: "Note successfully created",
      NoteDeleted: "Note successfully deleted",
      NoteSaved: "Note successfully saved",
    },
  },
  es: {
    translations: {
      // ***** UI
      Placeholder: "Escribe una nueva nota",
      Welcome: "Selecciona una nota para editar",
      About:
        "Esta es una aplicación de escritorio desarrollada con Tauri. Usando React/Typescript y Rust.",

      // ***** Window menu
      Minimize: "Minimizar",
      Maximize: "Maximizar",
      Restore: "Restaurar",
      Fullscreen: "Pantalla completa",
      Close: "Cerrar",

      // ***** Statusbar
      NoteCreated: "Nota creada correctamente",
      NoteDeleted: "Nota eliminada correctamente",
      NoteSaved: "Nota guardada correctamente",

      // ***** Menubar
      "Toggle sidebar": "Mostrar/ocultar barra lateral",
      Save: "Guardar",
      Undo: "Deshacer",
      Redo: "Rehacer",
      Bold: "Negrita",
      Italic: "Cursiva",
      Underline: "Subrayado",
      Strikethrough: "Tachado",
      Code: "Código",
      Highlight: "Resaltado",
      List: "Lista",
      "Ordered List": "Lista numerada",
      Subscript: "Subíndice",
      Superscript: "Superíndice",
      "Code Box": "Bloque de código",
      Quote: "Cita",
      Separator: "Separador",
      "Align Left": "Alinear izquierda",
      "Align Center": "Centrar",
      "Justify Text": "Justificar",
      "Align Right": "Alinear derecha",
      "Dark/Light Theme": "Modo claro/oscuro",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLng,
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

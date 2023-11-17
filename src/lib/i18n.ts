import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const defaultLng = "en";
const resources = {
  en: {
    translations: {
      Placeholder: "Write a new note",
      Welcome: "Select a note to edit",
      About:
        "This is a desktop app powered by Tauri. Using React/Typescript and Rust.",
      NoteCreated: "Note successfully created!",
      NoteDeleted: "Note successfully deleted",
      NoteSaved: "Note successfully saved!"
    },
  },
  es: {
    translations: {
      Placeholder: "Escribe una nueva nota",
      Welcome: "Selecciona una nota para editar",
      Minimize: "Minimizar",
      Maximize: "Maximizar",
      Restore: "Restaurar",
      Fullscreen: "Pantalla completa",
      Close: "Cerrar",
      About:
        "Esta es una aplicación de escritorio desarrollada con Tauri. Usando React/Typescript y Rust.",
      NoteCreated: "¡Nota creada correctamente!",
      NoteDeleted: "Nota eliminada correctamente",
      NoteSaved: "¡Nota guardada correctamente!"
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

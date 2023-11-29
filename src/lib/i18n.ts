import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const defaultLng = "en";
const resources = {
  en: {
    translations: {
      // ***** Modals
      Discard: "Are you sure you want to discard your changes?",
      ConfirmDeleteNote: "Are you sure you want to delete this note?",
      ConfirmDeleteFolder:
        "Are you sure you want to delete this folder and all its content?",

      // ***** UI
      Welcome: "Select a note to edit",
      About:
        "This is a desktop app powered by Tauri. Using React/Typescript and Rust.",

      // ***** Statusbar
      FolderCreated: "Folder successfully created",
      FolderDeleted: "Folder successfully deleted",
      NoteCreated: "Note successfully created",
      NoteDeleted: "Note successfully deleted",
      NoteSaved: "Note successfully saved",

      // ***** Toolbar
      "Link URL": "https://example.com",
    },
  },
  es: {
    translations: {
      // ***** Modals
      Discard: "¿Estás seguro que quieres descartar los cambios?",
      ConfirmDeleteNote: "¿Estás seguro que quieres eliminar esta nota?",
      ConfirmDeleteFolder:
        "¿Estás seguro que quieres eliminar esta carpeta y todo su contenido?",

      // ***** UI
      Cancel: "Cancelar",
      Welcome: "Selecciona una nota para editar",
      About:
        "Esta es una aplicación de escritorio desarrollada con Tauri. Usando React/Typescript y Rust.",

      // ***** Window menu
      Minimize: "Minimizar",
      Maximize: "Maximizar",
      Restore: "Restaurar",
      Fullscreen: "Pantalla completa",
      Close: "Cerrar",

      // ***** Context menu
      Delete: "Eliminar",
      "New note": "Nueva nota",
      "New folder": "Nueva carpeta",
      "Delete folder": "Eliminar carpeta",

      // ***** Statusbar
      FolderCreated: "Carpeta creada correctamente",
      FolderDeleted: "Carpeta eliminada correctamente",
      NoteCreated: "Nota creada correctamente",
      NoteDeleted: "Nota eliminada correctamente",
      NoteSaved: "Nota guardada correctamente",
      Characters: "Caracteres",
      Letters: "Letras",
      Words: "Palabras",
      Lines: "Líneas",

      // ***** Explorer menubar
      Reload: "Recargar",

      // ***** Toolbar
      "Toggle sidebar": "Mostrar/ocultar barra lateral",
      Save: "Guardar",
      Undo: "Deshacer",
      Redo: "Rehacer",

      Bold: "Negrita",
      Italic: "Cursiva",
      Underline: "Subrayado",
      Strikethrough: "Tachado",
      Highlight: "Resaltado",
      Code: "Código",

      "Heading 1": "Encabezado 1",
      "Heading 2": "Encabezado 2",
      "Heading 3": "Encabezado 3",
      "Heading 4": "Encabezado 4",

      "Bullet list": "Lista",
      "Ordered list": "Lista numerada",
      Subscript: "Subíndice",
      Superscript: "Superíndice",
      "Code block": "Bloque de código",
      Blockquote: "Cita",
      Separator: "Separador",

      Link: "Crear enlace",
      "Remove link": "Quitar enlace",
      "Enter URL": "Ingresar URL",
      "Link URL": "https://ejemplo.com",

      "Align left": "Alinear izquierda",
      "Align center": "Centrar",
      "Justify text": "Justificar",
      "Align right": "Alinear derecha",

      "Switch language": "Cambiar idioma",
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

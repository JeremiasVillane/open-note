<h4 align="right"><a href="https://github.com/JeremiasVillane/open-note">English</a> | <strong>Español</strong></h4>

<div align="center">
<img alt="Open Note" src="./public/open-note.png" width="200" />

<h1 align="center">Open Note <sup><em>alpha</em></sup></h1>

![Versión](https://img.shields.io/github/package-json/v/jeremiasvillane/open-note.svg)
<a href="https://github.com/jeremiasvillane/open-note/releases/latest"><img src="https://github.com/jeremiasvillane/open-note/actions/workflows/release.yml/badge.svg" alt="Estado del Build" /></a>
[![Licencia](https://badgen.net/github/license/jeremiasvillane/open-note)](https://github.com/jeremiasvillane/open-note/blob/main/LICENSE)
[![Estado del FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note?ref=badge_shield)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![Último commit](https://badgen.net/github/last-commit/jeremiasvillane/open-note)
<img alt="Actividad de commits" src="https://img.shields.io/github/commit-activity/w/jeremiasvillane/open-note?color=%2346bd1b">
<a href="https://www.rust-lang.org/" target="__blank" rel="noopener noreferrer"><img alt="Rust" src="https://img.shields.io/badge/Rust-1.73.0-dea584"></a>

### Tauri + React + Typescript

<a href="https://tauri.app/" target="_blank" rel="noopener noreferrer"><img alt="Tauri" src="./public/tauri.svg" width="33" /></a>&nbsp; &nbsp; &nbsp;<a href="https://react.dev" target="_blank" rel="noopener noreferrer"><img alt="React" src="./public/react.svg" width="36" /></a>&nbsp; &nbsp; &nbsp;<a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="./public/typescript.svg" width="36" /></a>

</div>

---

Una sencilla aplicación de escritorio para tomar notas con formato de texto enriquecido, desarrollada con [Tauri](https://tauri.app/) y [React](https://react.dev/), y escrita en [TypeScript](https://www.typescriptlang.org/) y [Rust](https://www.rust-lang.org/).

<div align="center"><img src="./public/open-note-screens.gif" alt="Open Note screen capture" width="555" /></div>

## Open Note está en alpha

Actualmente, Open Note está todavía en _alpha_, lo que significa que puede haber actualizaciones de versiones incompatibles, y se recomienda utilizarla si se ha hecho una copia de seguridad de los datos.

## Características principales

- Crear, editar y eliminar notas/carpetas.
- Editor de texto enriquecido con la tecnología de [TipTap](https://tiptap.dev/).
- Organizar notas en carpetas y subcarpetas.
- Exportación de notas en formato pdf.
- Multilingüe (actualmente inglés y español).
- Tema claro/oscuro.
- Barra de estado que muestra recuento de caracteres, letras, palabras y líneas, y mensajes del sistema.
- Teclas de acceso rápido globales para controlar las funciones principales mediante el teclado.
- Panel redimensionable para explorar el sistema de archivos.
- Uso de comandos Tauri (escritos en [Rust](https://www.rust-lang.org/)) para interactuar con el sistema de archivos del SO.
- Uso de la funcionalidad multiventana de Tauri para implementar modales personalizados.
- Uso de eventos Tauri para pasar información entre ventanas.

## Hoja de ruta del proyecto

- [x] Exportar notas en formato pdf.
- [ ] Arrastrar y soltar notas en carpetas.
- [ ] Sistema de etiquetado.
- [ ] Buscar notas.
- [ ] Insertar imágenes.
- [ ] Resaltado de código.
- [ ] Actualizaciones automáticas.
- [ ] Archivo de configuración persistente.
- [ ] Sincronización en la nube.
- [ ] Cifrado de notas.

## Descargar

Ir a la [página del release](https://github.com/JeremiasVillane/open-note/releases/latest).

## Tecnología

- [Tauri](https://tauri.app/): una herramienta para crear aplicaciones multiplataforma.
- [React](https://react.dev/) with [Vite](https://github.com/vitejs/vite).
- [Mantine](https://mantine.dev/) para el layout de la app.
- [TipTap](https://tiptap.dev/) para el editor de texto enriquecido.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) para la gestión de estados.
- [Tailwind CSS](https://tailwindcss.com/) para el estilo de la app.
- [react-i18next](https://react.i18next.com/): un potente framework de internacionalización basado en <strong>i18next</strong>.
- [React-pdf](https://react-pdf.org/): Renderizador de React para la creación de archivos PDF.
- [TypeScript](https://www.typescriptlang.org/) para seguridad de tipos.
- [Rust](https://www.rust-lang.org/) para la infraestructura base de la aplicación.

## Cómo ejecutar o compilar desde el código fuente

### Prerequisitos

- [NodeJS](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

### Paso 1: Clona el repositorio del proyecto en tu ordenador

- Abre un terminal y ejecuta el siguiente comando para clonar el proyecto desde GitHub a tu ordenador:

```
git clone https://github.com/JeremiasVillane/open-note.git
```

### Paso 2: Instalar las dependencias

- Abre un terminal y navega hasta el directorio del proyecto Open Note.
- Usa npm para instalar las dependencias:

```
cd open-note
npm install
```

### Paso 3: Instalar Tauri

- Visita la página [https://tauri.app/v1/guides/getting-started/prerequisites/](https://tauri.app/v1/guides/getting-started/prerequisites/) para encontrar las instrucciones de instalación de Tauri.

### Paso 4: Ejecutar o compilar

- Navega hasta el directorio del proyecto Open Note.
- Usa npm para ejecutar en modo de desarrollo:

```
npm run tauri dev
```

- O compila desde el código fuente:

```
npm run tauri build
```

## Licencia

Distribuido bajo la [**MIT License**](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note?ref=badge_large)

## Colaborar

Si quieres ayudar a Open Note, pon una estrella en este proyecto.

## Contactar conmigo

- [LinkedIn](https://snppr.vercel.app/2Vt7W2xMe)

<h4 align="right"><strong>English</strong> | <a href="./README_es.md">Español</a></h4>

<div align="center">
<img alt="Open Note" src="./public/open-note.png" width="200" />

<h1 align="center">Open Note <sup><em>alpha</em></sup></h1>

![Version](https://img.shields.io/github/package-json/v/jeremiasvillane/open-note.svg)
<a href="https://github.com/jeremiasvillane/open-note/releases/latest"><img src="https://github.com/jeremiasvillane/open-note/actions/workflows/release.yml/badge.svg" alt="GitHub Build Status" /></a>
[![License](https://badgen.net/github/license/jeremiasvillane/open-note)](https://github.com/jeremiasvillane/open-note/blob/main/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note?ref=badge_shield)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![Last commit](https://badgen.net/github/last-commit/jeremiasvillane/open-note)
<img alt="Commit activity" src="https://img.shields.io/github/commit-activity/w/jeremiasvillane/open-note?color=%2346bd1b">
<a href="https://www.rust-lang.org/" target="__blank"><img alt="Rust" src="https://img.shields.io/badge/Rust-1.73.0-dea584"></a>

### Tauri + React + Typescript

<a href="https://tauri.app/" target="_blank" rel="noopener noreferrer"><img alt="Tauri" src="./public/tauri.svg" width="33" /></a>&nbsp; &nbsp; &nbsp;<a href="https://react.dev" target="_blank" rel="noopener noreferrer"><img alt="React" src="./public/react.svg" width="36" /></a>&nbsp; &nbsp; &nbsp;<a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="./public/typescript.svg" width="36" /></a>

</div>

---

A simple note-taking desktop application to create rich text notes, built with [Tauri](https://tauri.app/) and [React](https://react.dev/), and written in [TypeScript](https://www.typescriptlang.org/) and [Rust](https://www.rust-lang.org/).

<div align="center"><img src="./public/open-note-screens.gif" alt="Open Note screen capture" width="555" /></div>

## Open Note is in alpha

Currently, Open Note is still in _alpha_, which means that there may be incompatible version updates, and it is recommended to use it if you have backed up your data.

## Key Features

- Create, edit and delete notes/folders.
- Rich text editor powered by [TipTap](https://tiptap.dev/).
- Organize notes into folders and subfolders.
- Export notes in pdf format.
- Multilingual (currently English and Spanish).
- Light/dark theme.
- Status bar showing characters, letters, word and line count, and system messages.
- Global hotkeys to control the main functions via keyboard.
- Resizable panel for exploring the file system.
- Use of Tauri commands (written in [Rust](https://www.rust-lang.org/)) to interact with the OS file system.
- Use of Tauri multiwindow functionality to implement custom modals.
- Use of Tauri events to pass information between windows.

## Project Roadmap

- [x] Export notes in pdf format.
- [ ] Drag & Drop notes in folders.
- [ ] Tagging system.
- [ ] Search notes.
- [ ] Insert images.
- [ ] Code highlighting.
- [ ] Automatic updates.
- [ ] Persistent config file.
- [ ] Cloud sync.
- [ ] Note encryption.

## Download

Go to the [release page](https://github.com/JeremiasVillane/open-note/releases/latest).

## Techstack

- [Tauri](https://tauri.app/): a toolkit to build cross-platform apps.
- [React](https://react.dev/) with [Vite](https://github.com/vitejs/vite).
- [Mantine](https://mantine.dev/) for the app layout.
- [TipTap](https://tiptap.dev/) for the rich text editor.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for state management.
- [Tailwind CSS](https://tailwindcss.com/) for the app styling.
- [react-i18next](https://react.i18next.com/): a powerful internationalization framework based on <strong>i18next</strong>.
- [React-pdf](https://react-pdf.org/): React renderer for creating PDF files.
- [TypeScript](https://www.typescriptlang.org/) for type safety.
- [Rust](https://www.rust-lang.org/) for the base infrastructure of the app.

## How to run or build from source

### Prerequisites

- [NodeJS](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

### Step 1: Clone the project repository to your computer

- Open a terminal and run the following command to clone the project from GitHub to your computer:

```
git clone https://github.com/JeremiasVillane/open-note.git
```

### Step 2: Install the dependencies

- Open a terminal and navigate to the Open Note project directory.
- Use npm to install the dependencies:

```
cd open-note
npm install
```

### Step 3: Install Tauri

- Visit the [https://tauri.app/v1/guides/getting-started/prerequisites/](https://tauri.app/v1/guides/getting-started/prerequisites/) page to find Tauri installation instructions.

### Step 4: Run or build

- Navigate to the Open Note project directory.
- Use npm to run in dev mode:

```
npm run tauri dev
```

- Or build from source:

```
npm run tauri build
```

## License

Distributed under the [**MIT License**](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note?ref=badge_large)

## Support
If you would like to support Open Note, please star this project. Your support is greatly appreciated.

## Contact me

- [LinkedIn](https://snppr.vercel.app/2Vt7W2xMe)

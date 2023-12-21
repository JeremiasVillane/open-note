<div align="center">
<img alt="Open Note" src="./public/open-note.png" width="200" />

# Open Note

![Version](https://img.shields.io/github/package-json/v/jeremiasvillane/open-note.svg)
[![License](https://badgen.net/github/license/jeremiasvillane/open-note)](https://github.com/jeremiasvillane/open-note/blob/main/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note?ref=badge_shield)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![Last commit](https://badgen.net/github/last-commit/jeremiasvillane/open-note)

### Tauri + React + Typescript

<a href="https://tauri.app/" target="_blank" rel="noopener noreferrer"><img alt="Tauri" src="./public/tauri.svg" width="33" /></a>&nbsp; &nbsp; &nbsp;<a href="https://react.dev" target="_blank" rel="noopener noreferrer"><img alt="React" src="./public/react.svg" width="36" /></a>&nbsp; &nbsp; &nbsp;<a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="./public/typescript.svg" width="36" /></a>

</div>

---

A simple Notes desktop app with rich text capabilities made with [Tauri](https://tauri.app/) and [React](https://react.dev/), written in [Rust](https://www.rust-lang.org/) and [TypeScript](https://www.typescriptlang.org/).

<div align="center"><img src="./public/open-note-screens.gif" alt="Open Note screen capture" width="555" /></div>

## Features

- Rich text editor powered by [TipTap](https://tiptap.dev/).
- Status bar showing chars, letters, words and lines counting as well as system messages.
- Organize notes in folders.
- Light/dark theme.
- Multilingual (currently english and spanish).
- Global hotkeys to control via keyboard the main functionalities.
- Resizable panel to explore the file system.
- Use of Tauri commands (written in [Rust](https://www.rust-lang.org/)) to interact with the OS file system.
- Use of Tauri multiwindow functionality to implement custom modals.
- Use of Tauri events to pass information between windows.

## TO-DO

:white_large_square: Export notes in pdf format.<br>
:white_large_square: Drag & Drop notes in folders.<br>
:white_large_square: Code highlighting.<br>
:white_large_square: Automatic updates.<br>
:white_large_square: Cloud sync.<br>
:white_large_square: Note encryption.<br>

## License

Distributed under the [**MIT License**](LICENSE).

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJeremiasVillane%2Fopen-note?ref=badge_large)

## Acknowledgments

This project would not exist without the hard work of others, first and foremost the maintainers and contributors of the below mentioned projects:

- [Tauri](https://tauri.app/)
- [Vite](https://github.com/vitejs/vite)
- [Mantine](https://mantine.dev/)
- [TipTap](https://tiptap.dev/)
- [ProseMirror](https://github.com/ProseMirror/)

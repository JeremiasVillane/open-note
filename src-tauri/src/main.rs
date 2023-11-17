// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "linux")]
use fork::{daemon, Fork};
use serde::Serialize;
#[cfg(target_os = "linux")]
use std::{fs::metadata, path::PathBuf};
use tauri::{self, Manager};
use tauri_plugin_store;
use window_shadows::set_shadow;
// Manager is used by .get_window

#[derive(Clone, Serialize)]
struct SingleInstancePayload {
    args: Vec<String>,
    cwd: String,
}

#[derive(Clone, Serialize)]
struct SystemTrayPayload {
    message: String,
}

#[tauri::command]
fn show_main_window(window: tauri::Window) {
    // replace "main" by the name of your window
    window.get_window("main").unwrap().show().unwrap();
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    // use tauri::{CustomMenuItem, Menu, Submenu};

    // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    // let close = CustomMenuItem::new("close".to_string(), "Close");
    // let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));

    // let menu = Menu::new().add_submenu(submenu);

    tauri::Builder::default()
        // .menu(menu)
        // .on_menu_event(|event| match event.menu_item_id() {
        //     "quit" => {
        //         std::process::exit(0);
        //     }
        //     "close" => {
        //         event.window().close().unwrap();
        //     }
        //     _ => {}
        // })
        .invoke_handler(tauri::generate_handler![show_main_window])
        // persistent storage with filesystem
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            if let Some(window) = app.get_window("main") {
                set_shadow(&window, true).ok();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

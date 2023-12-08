// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use window_shadows::set_shadow;
use tauri_plugin_positioner::{ WindowExt, Position };
use tauri::{ self, Manager };

mod file_handler;
use file_handler::get_user_app_files_command;
mod ui_handler;
use ui_handler::close_splashscreen;

fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![get_user_app_files_command, close_splashscreen])
        // persistent storage with filesystem
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();

            tauri::async_runtime::spawn(async move {
                splashscreen_window.move_window(Position::Center).ok();
                main_window.move_window(Position::Center).ok();

                #[cfg(any(target_os = "windows", target_os = "macos"))]
                {
                    set_shadow(&main_window, true).expect("Unsupported platform!");
                    set_shadow(&splashscreen_window, true).expect("Unsupported platform!");
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

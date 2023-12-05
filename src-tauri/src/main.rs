// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(target_os = "linux")]
use fork::{ daemon, Fork };
use serde::Serialize;
#[cfg(target_os = "linux")]
use std::{ fs::metadata, path::PathBuf };
use tauri::{ self, Manager, Window };
use tauri_plugin_store;
use window_shadows::set_shadow;
use tauri_plugin_positioner::{ WindowExt, Position };

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
async fn close_splashscreen(window: Window) {
    // Close splashscreen
    window
        .get_window("splashscreen")
        .expect("no window labeled 'splashscreen' found")
        .close()
        .unwrap();
    // Show main window
    window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![close_splashscreen])
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

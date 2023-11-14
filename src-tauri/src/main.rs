// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

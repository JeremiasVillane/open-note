use serde::Serialize;
use tauri::{ self, Manager, Window };

#[derive(Clone, Serialize)]
pub struct SingleInstancePayload {
    args: Vec<String>,
    cwd: String,
}

#[tauri::command]
pub async fn close_splashscreen(window: Window) {
    let main_window = window.get_window("main").expect("no window labeled 'main' found");

    // If main window it's not visible
    if let Ok(is_visible) = main_window.is_visible() {
        if !is_visible {
            // Close splashscreen
            window
                .get_window("splashscreen")
                .expect("no window labeled 'splashscreen' found")
                .close()
                .unwrap();
            // Show main window
            main_window.show().unwrap();
        }
    }
}

#[tauri::command]
pub async fn open_window(
    handle: tauri::AppHandle,
    label: &str,
    width: f64,
    height: f64
) -> Result<(), tauri::Error> {
    tauri::WindowBuilder
        ::new(
            &handle,
            label,
            tauri::WindowUrl::App(("index.html/#/".to_string() + label).parse().unwrap())
        )
        .inner_size(width, height)
        .always_on_top(true)
        .resizable(false)
        .maximizable(false)
        .minimizable(false)
        .decorations(false)
        .visible(false)
        .center()
        .build()
        .unwrap();
    Ok(())
}

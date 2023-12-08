use serde::Serialize;
use tauri::{ self, Manager, Window };

#[derive(Clone, Serialize)]
pub struct SingleInstancePayload {
    args: Vec<String>,
    cwd: String,
}

#[tauri::command]
pub async fn close_splashscreen(window: Window) {
    // Close splashscreen
    window
        .get_window("splashscreen")
        .expect("no window labeled 'splashscreen' found")
        .close()
        .unwrap();
    // Show main window
    window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}
use std::fs;
use std::path::{ Path, PathBuf };
use sha2::{ Digest, Sha256 };
use serde::Serialize;
use tauri::InvokeError;

#[derive(Clone, Serialize)]
pub struct FileInfo {
    name: String,
    path: PathBuf,
    is_folder: bool,
}

fn compute_id(path: &PathBuf) -> String {
    // Convert the folder path to a string
    let path_str = path.to_string_lossy();

    // Compute the SHA-256 hash of the folder path
    let hash_result = Sha256::digest(path_str.as_bytes());

    // Convert the hash to a hex string
    format!("{:x}", hash_result)
}

pub fn read_file_structure(path: &Path) -> Result<Vec<FileInfo>, std::io::Error> {
    let mut file_info_list = Vec::new();
    if let Ok(entries) = fs::read_dir(path) {
        for entry in entries {
            if let Ok(entry) = entry {
                let file_type = entry.file_type()?;
                let file_info = FileInfo {
                    name: entry.file_name().to_string_lossy().into_owned(),
                    path: entry.path(),
                    is_folder: file_type.is_dir(),
                };

                file_info_list.push(file_info.clone());
            }
        }
    }
    file_info_list.sort_by(|a, b| {
        b.is_folder
            .cmp(&a.is_folder)
            .then_with(|| { a.name.to_lowercase().cmp(&b.name.to_lowercase()) })
    });

    Ok(file_info_list)
}

#[derive(Clone, Serialize)]
pub struct FileObj {
    id: String,
    name: String,
    path: PathBuf,
    is_folder: bool,
    children: Option<Vec<FileObj>>,
}

fn map_to_file_obj(file_info: FileInfo) -> FileObj {
    let id = compute_id(&file_info.path);
    let name = file_info.name.split('.').next().unwrap_or_default().to_owned();

    if file_info.is_folder {
        FileObj {
            id,
            name,
            path: file_info.path.clone(),
            is_folder: true,
            children: Some(
                read_file_structure(&file_info.path)
                    .unwrap_or_default()
                    .into_iter()
                    .map(map_to_file_obj)
                    .collect()
            ),
        }
    } else {
        FileObj {
            id,
            name,
            path: file_info.path,
            is_folder: false,
            children: None,
        }
    }
}

pub fn get_user_app_files(path: &str) -> Result<FileObj, std::io::Error> {
    let file_info_list = read_file_structure(Path::new(path))?;
    let root_file_objs: Vec<FileObj> = file_info_list.into_iter().map(map_to_file_obj).collect();

    Ok(FileObj {
        id: compute_id(&PathBuf::from(path)),
        name: path.to_owned(),
        path: PathBuf::from(path),
        is_folder: true,
        children: Some(root_file_objs),
    })
}

// Reading files
#[tauri::command]
pub fn get_user_app_files_command(path: String) -> Result<FileObj, InvokeError> {
    get_user_app_files(&path).map_err(|e|
        InvokeError::from(format!("Failed to get user app files: {:?}", e))
    )
}

// Creating/Updating text files
#[tauri::command]
pub fn write_text_file(path: String, content: String) -> Result<(), String> {
    std::fs::write(&path, &content).map_err(|e| e.to_string())?;
    Ok(())
}

// Creating directories
#[tauri::command]
pub fn create_directory(path: String) -> Result<(), String> {
    std::fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    Ok(())
}

// Reanaming files/directories
#[tauri::command]
pub fn rename_item(old_path: String, new_name: String) -> Result<(), String> {
    let parent_directory = match std::path::Path::new(&old_path).parent() {
        Some(parent) => parent,
        None => {
            return Err("Failed to determine parent directory".to_string());
        }
    };

    let new_path = parent_directory.join(&new_name);

    std::fs::rename(&old_path, &new_path).map_err(|e| e.to_string())?;
    Ok(())
}

// Deleting files/directories
#[tauri::command]
pub fn delete_item(path: String, is_folder: bool) -> Result<(), String> {
    let result = if is_folder {
        std::fs::remove_dir_all(&path)
    } else {
        std::fs::remove_file(&path)
    };

    result.map_err(|e| e.to_string())?;
    Ok(())
}

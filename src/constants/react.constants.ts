import packageJson from "../../package.json";

export const APP_LICENSE = packageJson.license;
export const TAURI_VERSION = packageJson.dependencies["@tauri-apps/api"].slice(1);
export const REACT_VERSION = packageJson.dependencies.react.slice(1);

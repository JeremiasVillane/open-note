import * as fs from "@tauri-apps/api/fs";
import * as os from "@tauri-apps/api/os";
import * as tauriPath from "@tauri-apps/api/path";
import { currentMonitor, getCurrent } from "@tauri-apps/api/window";
import { useEffect } from "react";
import packageJson from "../../package.json";
import tauriConfJson from "../../src-tauri/tauri.conf.json";

export const HEADER_TITLE = "HEADER_TITLE goes here";
export const FOOTER = "FOOTER goes here";
export const APP_NAME = tauriConfJson.package.productName;
export const VERSION = packageJson.version;
export const WINDOW_TITLE = "WINDOW_TITLE set in utils.js";
const EXTS = new Set([".json"]);
export const RUNNING_IN_TAURI = window.__TAURI__ !== undefined;
export const IS_DEVELOPMENT = import.meta.env.MODE === "development";
export const IS_PRODUCTION = !IS_DEVELOPMENT;

export function trueTypeOf(obj: Record<string, any>) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  /*
        []              -> array
        {}              -> object
        ''              -> string
        new Date()      -> date
        1               -> number
        function () {}  -> function
        async function () {}  -> asyncfunction
        /test/i         -> regexp
        true            -> boolean
        null            -> null
        trueTypeOf()    -> undefined
    */
}

export function useMinWidth(minWidth: number) {
  if (RUNNING_IN_TAURI) {
    useEffect(() => {
      async function resizeWindow() {
        // to set a size consistently across devices,
        //  one must use LogicalSize (Physical cannot be relied upon)
        const physicalSize = await getCurrent().innerSize();
        // Since innerSize returns Physical size, we need
        //   to get the current monitor scale factor
        //   to convert the physical size into a logical size
        const monitor = await currentMonitor();
        const scaleFactor = monitor?.scaleFactor;
        const logicalSize = physicalSize.toLogical(scaleFactor ?? 1);
        if (logicalSize.width < minWidth) {
          logicalSize.width = minWidth;
          await getCurrent().setSize(logicalSize);
        }
      }
      resizeWindow().catch(console.error);
    }, []); // [] to ensure on first render
  }
}

function* flattenFiles(entries: any): Generator<Record<string, any>> {
  for (const entry of entries) {
    entry.children === null
      ? yield entry.path
      : yield* fileSaveFiles(entry.children);
  }
}

function getExtension(path: string) {
  // Modified from https://stackoverflow.com/a/12900504/7732434
  // get filename from full path that uses '\\' or '/' for seperators
  var basename = path.split(/[\\/]/).pop(),
    pos = basename?.lastIndexOf(".");
  // if `.` is not in the basename
  if (pos && pos < 0) return "";
  // extract extension including `.`
  return basename?.slice(pos);
}

export async function getUserAppFiles() {
  // returns an array of files from $DOCUMENT/$APP_NAME/* with extension that is in EXTS
  //  implying that the app (tauri-plugin-store) can parse the files
  // returns [] if $DOCUMENT/$APP_NAME is a file
  const documents = await tauriPath.documentDir();
  const saveFiles = [];
  await fs.createDir(APP_NAME, {
    dir: fs.BaseDirectory.Document,
    recursive: true,
  });
  const entries = await fs.readDir(APP_NAME, {
    dir: fs.BaseDirectory.AppData,
    recursive: true,
  });
  if (entries !== null) {
    const osType = await os.type();
    const sep = osType === "Windows_NT" ? "\\" : "/";
    const appFolder = `${documents}${sep}${APP_NAME}`;
    for (const { path } of flattenFiles(entries)) {
      const friendlyName = path.substring(appFolder.length + 1, path.length);
      const extension = getExtension(path);
      if (extension !== undefined && EXTS.has(extension.toLowerCase()))
        saveFiles.push({ path, name: friendlyName });
    }
  }
  return saveFiles;
}

// show browser / native notification
export function notify(title: string, body: string) {
  new Notification(title, { body: body || "" });
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function downloadFile(
  filename: string,
  content: string,
  contentType = "text/plain"
) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

Math.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
// function* fileSaveFiles(
//   arg: string | Record<string, any>,
// ): Generator<Record<string, any>, any, unknown> {
//   throw new Error("Function not implemented.");
// }

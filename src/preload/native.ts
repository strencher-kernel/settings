import IPC from "./ipc";
import {Electron, Fs} from "./api";
import path from "path";

export type NativeModuleName = "ipc" | "electron" | "fs" | "path";

export type NativeModule<T> =
    T extends "ipc" ? typeof IPC :
    T extends "electron" ? typeof Electron :
    T extends "fs" ? typeof Fs :
    T extends "path" ? typeof path : never;

const SettingsNative = {
    modules: ["ipc", "electron", "fs", "path"],
    requireModule<T extends NativeModuleName>(module: T): NativeModule<T> {
        switch (module) {
            case "ipc": return IPC as NativeModule<typeof IPC>;
            case "electron": return Electron as NativeModule<typeof Electron>;
            case "fs": return Fs as NativeModule<typeof Fs>;
            case "path": return path as NativeModule<typeof path>;

            default: throw new Error(`Cannot find module "${module}"`);
        }
    }
};

export default SettingsNative;
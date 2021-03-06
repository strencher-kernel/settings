import IPC from "./ipc";
import {ChildProcess, Electron, Fs} from "./api";
import path from "path";

export type NativeModuleName = "ipc" | "electron" | "fs" | "path" | "run" | "child_process";

export type NativeModule<T> =
    T extends "ipc" ? typeof IPC :
    T extends "electron" ? typeof Electron :
    T extends "fs" ? typeof Fs :
    T extends "path" ? typeof path :
    T extends "run" ? typeof eval :
    T extends "child_process" ? typeof ChildProcess : never;

const SettingsNative = {
    modules: ["ipc", "electron", "fs", "path", "run", "child_process"],
    requireModule<T extends NativeModuleName>(module: T): NativeModule<T> {
        switch (module) {
            case "ipc": return IPC as NativeModule<typeof IPC>;
            case "electron": return Electron as NativeModule<typeof Electron>;
            case "fs": return Fs as NativeModule<typeof Fs>;
            case "path": return path as NativeModule<typeof path>;
            case "run": return ((js: string) => eval(js)) as NativeModule<() => any>;
            case "child_process": return ChildProcess as NativeModule<typeof ChildProcess>;

            default: throw new Error(`Cannot find module "${module}"`);
        }
    }
};

export default SettingsNative;
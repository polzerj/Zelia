import Logger from "../../types/Logger";

export default class NullDeviceLogger implements Logger {
    log(...x: any[]) {}
    info(...x: any[]) {}
    error(...x: any[]) {}
    warn(...x: any[]) {}
}

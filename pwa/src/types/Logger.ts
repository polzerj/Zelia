
export default interface Logger {
    log: (...x: any[]) => void;
    info: (...x: any[]) => void;
    error: (...x: any[]) => void;
    warn: (...x: any[]) => void;
}

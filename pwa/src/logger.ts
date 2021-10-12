
class Logger {
    
    log(...x: any[]) {
        console.log(...x);    
    }
    
    info(...x: any[]) {
        console.info(...x);
    }
    
    error(...x: any[]) {
        console.error(...x);
    }

    warn(...x: any[]) {
        console.warn(...x);
    }
}

export default new Logger();
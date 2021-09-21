import Debug from "./components/Debug"

let debug: Debug;
function log(...x: any[]) {
    console.log(...x);
    debug?.log(...x);
}

function info(...x: any[]) {
    console.info(...x);
    debug?.info(...x);
}

function error(...x: any[]) {
    console.error(...x);
    debug?.error(...x);
}
function warn(...x: any[]) {
    console.warn(...x);
    debug?.warn(...x);
}

function appendDebug(){
    debug = document.createElement("zelia-debug") as Debug;
    document.body.append(debug);
}

export default {log, info, error, warn, appendDebug}
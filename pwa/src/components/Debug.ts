import Component from "../types/Component";
export type LogLevel = "log" | "warn" | "error" | "info" | "debug";
export interface LoggingInformation {
    loglevel: LogLevel;
    message: string;
}
interface SearchQueries {
    console: HTMLDivElement;
    button: HTMLButtonElement;
}

export default class Debug extends Component<SearchQueries> {
    lineNumber: number;
    private logs: LoggingInformation[] = [];

    constructor() {
        super("zelia-debug", {
            queries: { console: "#divConsole", button: "#btnExport" },
        });

        this.lineNumber = 0;
    }

    registerEventListenerCallback() {
        this.elements.button.addEventListener("click", this.exportClicked);
    }

    removeEventListenerCallback() {
        this.elements.button.removeEventListener("click", this.exportClicked);
    }

    bindMethodsCallback() {
        this.exportClicked = this.exportClicked.bind(this);
    }

    private createLine(...content: any[]) {
        for (let i = 0; i < content.length; i++) {
            if (
                content[i] instanceof Object &&
                !(content[i] instanceof Error)
            ) {
                content[i] = JSON.stringify(content[i]);
            }
        }

        let line = document.createElement("span");
        line.textContent = content.join(" - ");
        this.shadowRoot?.append(line);
        return line;
    }

    log(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("log");

        this.logs.push({
            loglevel: "log",
            message: line.innerText,
        });
    }

    info(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("info");
        this.logs.push({
            loglevel: "info",
            message: line.innerText,
        });
    }
    error(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("err");

        this.logs.push({
            loglevel: "error",
            message: line.innerText,
        });
    }
    warn(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("warn");

        this.logs.push({
            loglevel: "warn",
            message: line.innerText,
        });
    }

    exportLogs(loglevel: LogLevel | "all" = "all") {
        if (loglevel === "all") {
            return this.logs;
        }
        return this.logs.filter((x) => x.loglevel === loglevel);
    }

    exportClicked() {
        let logs = this.exportLogs("all");
        let link = document.createElement("a");
        link.href =
            "data:text/plain;charset=UTF-8,Export" +
            encodeURIComponent(
                logs.map((log) => `${log.loglevel}: ${log.message}`).join("\n")
            );

        link.target = "_blank";
        link.download = `log-${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}.txt`;
        link.click();
    }
}

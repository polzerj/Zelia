import Component from "../types/Component";

export default class Debug extends Component<{}> {

    lineNumber: number;

    constructor() {
        super("zelia-debug");
        
        this.lineNumber = 0;
    }

    private createLine(...content: any[]) {

        for (let i = 0; i < content.length; i++) {
            if (content[i] instanceof Object && !(content[i] instanceof Error)){
                content[i] = JSON.stringify(content[i]);
            }
        }

        let line = document.createElement("span");
        line.textContent = content.join(' - ');
        this.shadowRoot?.append(line);
        return line;
    }

    log(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("log")
    }

    info(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("info")
    }
    error(...x: any[]) {
        const line = this.createLine(...x);
        line.classList.add("err")
    }
    warn(...x: any[]){
        const line = this.createLine(...x);
        line.classList.add("warn")
    }
}

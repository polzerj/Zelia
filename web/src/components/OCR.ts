import Component from "../types/Component";
import logger from "../logger";

export default class OCR extends Component<{ video: HTMLVideoElement }> {
    constructor() {
        super("zelia-ocr", { video: "video" });
    }

    bindMethodsCallback() {
        this.link = this.link.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.error = this.error.bind(this);
    }

    connectedCallback() {
        navigator.mediaDevices
            .getUserMedia({
                video: { facingMode: "environment" },
                audio: false,
            })
            .then(this.link)
            .catch(this.error);
    }

    registerEventListenerCallback() {
        this.elements.video.addEventListener("click", this.togglePause);
    }
    removeEventListenerCallback() {
        this.elements.video.removeEventListener("click", this.togglePause);
    }

    link(stream: any) {
        this.elements.video.srcObject = stream;

        this.start();
    }

    error(e: any) {
        logger.error(e);
        this.shadowRoot?.querySelector("span")?.classList.remove("hidden");

        this.elements.video.classList.add("hidden");
    }

    start() {
        this.elements.video.play();
    }

    pause() {
        this.elements.video.pause();
    }

    togglePause() {
        if (this.elements.video.paused) {
            this.start();
        } else this.pause();
    }

    
    getValidPart(text:string): string|undefined {
        const regEx = /[A-Z][0-9]{4}(\.[0-9])?/g;
        if (!regEx.test(text)) return ;
        let matches = text.match(regEx);
        return matches?.[0];
    }
}

export function isRoomNumberValid(text: string) {
    const regEx = /^[A-Z][0-9]{4}(\.[0-9])?$/;
    return regEx.test(text);
}
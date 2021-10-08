import { start } from "repl";
import OCRModule from "../services/OCRModule";
import Component from "../types/Component";

interface SearchElements {
    video: HTMLVideoElement;
    errorMsg: HTMLSpanElement;
}

export default class OCR extends Component<SearchElements> {
    private ocr: OCRModule;
    private workerTask: Promise<void>;
    private ocrInterval: number = 1000;
    private ocrIntervalNumber: any = -1;
    private virtualScreen: HTMLCanvasElement;

    constructor() {
        super("zelia-ocr", { video: "#screen", errorMsg: "#errorMsg" });
        this.setState("errorMsg", "Couldn't capture camera stream");

        this.ocr = new OCRModule();
        this.workerTask = this.ocr.initializeWorkers(1);

        this.virtualScreen = document.createElement("canvas");
        document.body.append(this.virtualScreen);
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

    bindMethodsCallback() {
        this.error = this.error.bind(this);
        this.link = this.link.bind(this);
    }

    error(e: any) {
        console.error(e);

        this.elements.errorMsg.classList.remove("hidden");
        this.elements.video.classList.add("hidden");
    }

    async link(stream: MediaStream) {
        this.elements.video.srcObject = stream;
        await this.workerTask;

        this.play();

        this.ocrIntervalNumber = setInterval(
            this.doOcr.bind(this),
            this.ocrInterval
        ) as any;
    }
    doOcr() {
        this.virtualScreen.width = this.elements.video.videoWidth;
        this.virtualScreen.height = this.elements.video.videoHeight;

        this.virtualScreen
            .getContext("2d")
            ?.drawImage(this.elements.video, 0, 0);
        console.log(this.virtualScreen);

        let area = compress(this.virtualScreen);

        this.ocr.convert(this.virtualScreen, area).then((s) => {
            document.body.append(s);
        });
    }

    play() {
        this.elements.video.play();
    }

    pause() {
        this.elements.video.pause();
    }
}

function compress(virtualScreen: HTMLCanvasElement) {
    let imgData = virtualScreen
        .getContext("2d")!
        .getImageData(0, 0, virtualScreen.width, virtualScreen.height);

    let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] + data[i + 1] + data[i + 2] < 150) {
            // pixel is black
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
        } else {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        }
    }

    let leftTopPoint = { x: virtualScreen.width, y: virtualScreen.height };
    let rightBottomPoint = { x: 0, y: 0 };

    for (let x = 0; x < imgData.width; x++) {
        for (let y = 0; y < imgData.height; y++) {
            let i = (imgData.width * y + x) * 4;

            if (data[i] + data[i + 1] + data[i + 2] == 0) {
                //
                if (x < leftTopPoint.x) leftTopPoint.x = x;
                if (y < leftTopPoint.y) leftTopPoint.y = y;
                if (x > rightBottomPoint.x) rightBottomPoint.x = x;
                if (y > rightBottomPoint.y) rightBottomPoint.y = y;
            }
        }
    }

    virtualScreen.getContext("2d")!.putImageData(imgData, 0, 0);

    return {
        top: leftTopPoint.y,
        left: leftTopPoint.x,
        width: rightBottomPoint.x - leftTopPoint.x,
        height: rightBottomPoint.y - leftTopPoint.y,
    };
}

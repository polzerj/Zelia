import logger from "../util/logger";
import OCRModule from "../services/OCRModule";
import Component from "../types/Component";
import { getMatchingPart, isRoomNumberValid } from "../services/validation";
import router from "../router";

interface SearchElements {
    canvas: HTMLCanvasElement;
    errorMsg: HTMLSpanElement;
}

interface IntervalCancelToken {
    id?: number;
}

export default class OCR extends Component<SearchElements> {
    private ocr: OCRModule;
    private workerTask: Promise<void>;
    private ocrInterval: number = 1000;
    private ocrIntervalCancelToken: IntervalCancelToken = {};
    private virtualCamera: HTMLVideoElement;
    private virtualScreen: HTMLCanvasElement;
    private stream?: MediaStream;

    constructor() {
        super("zelia-ocr", {
            queries: { canvas: "#screen", errorMsg: "#errorMsg" },
        });
        this.setState("errorMsg", "Couldn't capture camera stream");

        this.ocr = new OCRModule();
        this.workerTask = this.ocr.initializeWorkers(1);

        this.virtualCamera = document.createElement("video");
        this.virtualCamera.width = window.innerWidth;

        this.virtualScreen = document.createElement("canvas");

        this.elements.canvas.style.width = "100%";

        //this.inject();
    }

    async inject() {
        this.link = async (stream: MediaStream) => {
            let img = this.shadowRoot?.querySelector("#img") as HTMLImageElement;

            console.log(img);
            this.virtualCamera = img;

            //let ratio = videoWidth / videoHeight; S 2410   Lehrsaal 1 AHITN
            this.elements.canvas.width = img.width; //646 × 218
            this.elements.canvas.height = img.height;

            //this.elements.canvas.style.width = "100%";

            //let centerY = this.elements.canvas.height / 2;

            let ctx = this.elements.canvas.getContext("2d")!;

            const render = () => {
                ctx.drawImage(img, 0, 0);

                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0, 0, this.elements.canvas.width, centerY - 100);
                ctx.fillRect(0, centerY + 100, this.elements.canvas.width, this.elements.canvas.height);

                requestAnimationFrame(render);
            };
            requestAnimationFrame(render);

            // start ocr interval
            this.virtualScreen.width = this.elements.canvas.width;
            this.virtualScreen.height = this.elements.canvas.height;

            this.ocrIntervalCancelToken.id = setInterval(this.doOcr.bind(this), this.ocrInterval) as any;

            document.body.append(this.virtualScreen);
        };
        await this.workerTask;
    }

    removeEventListenerCallback() {
        if (this.ocrIntervalCancelToken.id) clearInterval(this.ocrIntervalCancelToken.id);
        this.stream?.getTracks().forEach((track) => {
            track.stop();
        });
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
        logger.error(e);

        this.elements.errorMsg.classList.remove("hidden");
        this.elements.canvas.classList.add("hidden");
    }

    async link(stream: MediaStream) {
        this.stream = stream;
        let img = this.shadowRoot?.querySelector("#img") as HTMLImageElement;

        this.virtualCamera.srcObject = stream;
        await this.workerTask;

        await this.play();

        // create canvas and show borders
        let { videoWidth, videoHeight } = this.virtualCamera;

        logger.log(videoWidth, videoHeight);

        //let ratio = videoWidth / videoHeight;
        this.elements.canvas.width = videoWidth;
        this.elements.canvas.height = videoHeight;

        this.elements.canvas.style.width = "100%";

        let centerY = this.elements.canvas.height / 2;

        let ctx = this.elements.canvas.getContext("2d")!;

        const render = () => {
            ctx.drawImage(img, -250, 0);

            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, this.elements.canvas.width, centerY - 100);
            ctx.fillRect(0, centerY + 100, this.elements.canvas.width, this.elements.canvas.height);

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        // start ocr interval
        this.virtualScreen.width = this.elements.canvas.width;
        this.virtualScreen.height = 200;

        this.ocrIntervalCancelToken.id = setInterval(this.doOcr.bind(this), this.ocrInterval) as any;
    }
    doOcr() {
        this.virtualScreen.getContext("2d")?.drawImage(this.virtualCamera, 0, 600);

        let area = compress(this.virtualScreen);

        let end = logger.time("ocr" + Math.random());
        this.ocr.convert(this.virtualScreen, area).then((s) => {
            logger.log(s);

            end();

            // TODO: check for room number and route to site :)
            let num = getMatchingPart(s) ?? "";
            if (isRoomNumberValid(num)) {
                logger.info("found:" + num);
                //router.redirect("/room/" + num);
            }
        });
    }

    async play() {
        await this.virtualCamera.play();
    }

    pause() {
        this.virtualCamera.pause();
    }
}

function compress(virtualScreen: HTMLCanvasElement) {
    //return { top: 0, left: 0, width: virtualScreen.width, height: virtualScreen.height };

    let end = logger.time("compress" + Math.random());
    let imgData = virtualScreen.getContext("2d")!.getImageData(0, 0, virtualScreen.width, virtualScreen.height);

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

    end();

    return {
        top: leftTopPoint.y,
        left: leftTopPoint.x,
        width: rightBottomPoint.x - leftTopPoint.x,
        height: rightBottomPoint.y - leftTopPoint.y,
    };
}

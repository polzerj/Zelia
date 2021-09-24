import { createWorker, createScheduler, RecognizeResult } from "tesseract.js";
import logger from "../logger";

export default class OcrConverter {
    private scheduler = createScheduler();
    numOfWorker: number;
    lang: string;

    constructor(numberOfWorker: number = 4, lang: string = "eng") {
        this.numOfWorker = numberOfWorker;
        this.lang = lang;
    }

    public async initializeWorkers() {
        var regs: Promise<void>[] = [];
        for (var i = 0; i < this.numOfWorker; i++) {
            logger.log(`starting ocr service(${i + 1}/${this.numOfWorker})...`);
            regs.push(this.createWorker());
        }
        //await regs[0];
        await Promise.all(regs);
        logger.log("ocr started...");
    }
    private async createWorker() {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage(this.lang);
        await worker.initialize(this.lang);
        this.scheduler.addWorker(worker);
    }

    public async convert(canvasElement: HTMLCanvasElement): Promise<string> {
        const {
            data: { text },
        } = (await this.scheduler.addJob(
            "recognize",
            canvasElement
        )) as RecognizeResult;
        return text;
    }
}

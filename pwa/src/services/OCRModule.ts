import { createWorker, createScheduler, Scheduler } from "tesseract.js";
import logger from "../util/logger";

interface Area2D {
    top: number;
    left: number;
    width: number;
    height: number;
}

export default class OCRModule {
    scheduler: Scheduler = createScheduler();

    public async initializeWorkers(numOfWorker: number = 1) {
        var registrations: Promise<void>[] = [];
        for (var i = 0; i < numOfWorker; i++) {
            logger.log(`starting ocr service(${i + 1}/${numOfWorker})...`);
            registrations.push(this.createWorker());
        }
        await Promise.all(registrations);
        logger.log("ocr started...");
    }
    private async createWorker(lang = "eng") {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage(lang);
        await worker.initialize(lang);
        this.scheduler.addWorker(worker);
    }

    public async convert(source: HTMLCanvasElement, area: Area2D) {
        const {
            data: { text },
        } = await this.scheduler.addJob("recognize", source, {
            rectangle: area,
        });
        return text;
    }
}

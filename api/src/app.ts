import { ControllerBase, Middleware } from "./types";
import * as express from "express";
import { Application } from "express";

const standardInit = {
    port: +process.env.PORT || 5000,
    controllers: [],
    middleWares: [],
    baseUrl: "/",
};

export default class App {
    public app: Application;
    public port: number;
    baseUrl: string;

    constructor(appInit?: {
        port?: number;
        middleWares?: Middleware[];
        controllers?: ControllerBase[];
        baseUrl?: string;
    }) {
        appInit = { ...standardInit, ...appInit };
        this.app = express();
        this.port = appInit.port;
        this.baseUrl = appInit.baseUrl;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }

    private middlewares(middleWares: Middleware[]) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: ControllerBase[]) {
        controllers.forEach((controller) => {
            this.app.use(this.baseUrl, controller.router);
        });
    }

    public listen() {
        return this.app.listen(this.port, () => {
            console.log(
                `App listening on the http://localhost:${this.port}/api`
            );
        });
    }
}

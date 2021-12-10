import { Middleware } from ".";
import { Request, Response, Router } from "express";

interface MiddlewareParam {
    all?: Middleware[];
    get?: Middleware[];
    post?: Middleware[];
    put?: Middleware[];
    patch?: Middleware[];
    delete?: Middleware[];
}

export default abstract class ControllerBase {
    path: string;
    public router = Router();

    public get Path() {
        return this.path;
    }

    constructor(path: string, middlewareParam?: MiddlewareParam) {
        this.path = path;
        this.initRoutes(middlewareParam);
    }

    public initRoutes(middlewareParam?: MiddlewareParam) {
        const {
            all,
            get,
            post,
            put,
            patch,
            delete: dlt,
        } = Object.assign<MiddlewareParam, MiddlewareParam>({ all: [], get: [], post: [], put: [], patch: [], delete: [] }, middlewareParam);

        all.forEach((middleware) => this.router.use(middleware));
        this.router.get(this.path, ...get, this.get);
        this.router.post(this.path, ...post, this.post);
        this.router.delete(this.path, ...dlt, this.delete);
        this.router.put(this.path, ...put, this.put);
        this.router.patch(this.path, ...patch, this.patch);
    }

    get(req: Request, res: Response) {
        res.sendStatus(405);
    }
    post(req: Request, res: Response) {
        res.sendStatus(405);
    }
    delete(req: Request, res: Response) {
        res.sendStatus(405);
    }
    put(req: Request, res: Response) {
        res.sendStatus(405);
    }
    patch(req: Request, res: Response) {
        res.sendStatus(405);
    }
}

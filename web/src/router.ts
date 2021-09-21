import logger from "./logger";

export type RoutedAction = () => void;

interface RouterEvent {
    path: string;
    action: RoutedAction;
}

class Router {
    private registeredEvents: RouterEvent[];
    private rootELement: HTMLElement;

    public constructor(rootELement: HTMLElement) {
        this.registeredEvents = [];
        this.rootELement = rootELement;

        logger.info("Router created! Starting on: " + window.location.pathname);

        this.onPop = this.onPop.bind(this);
        window.addEventListener("popstate", this.onPop);
    }

    public route(path: string, silentHistroy = false) {
        logger.info((silentHistroy ? "Returing" : "Routing") + " to " + path);
        this.rootELement.innerHTML = "";

        !silentHistroy && window.history.pushState({}, "", path);

        this.emitEvent(path);
    }

    private onPop() {
        this.route(window.location.pathname, true);
    }

    private emitEvent(path: string) {
        path = this.normalizePath(path);
        this.registeredEvents
            .filter((e) => e.path === path)
            .forEach((event) => {
                event.action();
            });
    }

    public on(path: string, action: RoutedAction) {
        this.registeredEvents.push({ path, action });

        if (path === window.location.pathname) {
            action();
        }
    }
    private normalizePath(path: string) : string{
        return path.split("?")[0];
    }
}

export default new Router(document.querySelector("#app")!);

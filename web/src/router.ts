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
        this.clearRootElement();

        !silentHistroy && window.history.pushState({}, "", path);

        this.emitEvent(path);
    }

    private onPop() {
        this.route(window.location.pathname, true);
    }

    private emitEvent(path: string) {
        path = this.normalizePath(path);
        const matchingEvents = this.registeredEvents.filter(
            (e) => e.path === path
        );
        matchingEvents.forEach((event) => {
            event.action();
        });
        if (matchingEvents.length === 0) {
            this.registeredEvents
                .filter((e) => e.path === "404")
                .forEach((e) => e.action());
        }
    }

    public on(path: string, action: RoutedAction) {
        this.registeredEvents.push({ path, action });
        if (
            this.registeredEvents.every(
                (e) => e.path !== window.location.pathname
            )
        ) {
            this.clearRootElement();
            this.registeredEvents
                .filter((e) => e.path === "404")
                .forEach((e) => e.action());
        }
        if (path === window.location.pathname) {
            if (
                this.registeredEvents.filter((e) => e.path === path).length ===
                1
            ) {
                this.clearRootElement();
            }
            action();
        }
    }
    private normalizePath(path: string): string {
        return path.split("?")[0];
    }
    private clearRootElement() {
        this.rootELement.innerHTML = "";
    }
}

export default new Router(document.querySelector("#app")!);

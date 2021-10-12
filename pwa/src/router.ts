import logger from "./util/logger";

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

        logger.info(
            "Router created! Starting on: " + window.location.pathname
        );

        this.onPop = this.onPop.bind(this);
        window.addEventListener("popstate", this.onPop);
    }
    /**
     * Redirect Page
     * @param path path to redirect to.
     * E.g.: "/login"
     * When path not known -> render 404 page
     * @param silentHistory Set to true when
     */
    public redirect(path: string, silentHistory = false) {
        logger.info((silentHistory ? "Returning" : "Routing") + " to " + path);
        this.clearRootElement();

        !silentHistory && window.history.pushState({}, "", path);

        this.emitEvent(path);
    }

    private onPop() {
        this.redirect(window.location.pathname, true);
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

    /**
     * Register action which gets executed when path is routed
     */
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

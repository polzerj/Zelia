import logger from "./util/logger";

export type RoutedAction = (variables?: PathVariables) => void;

interface RouterEvent {
    path: string;
    action: RoutedAction;
}

export type PathVariables = { [key: string]: string };

interface RouterEventInfo {
    events: RouterEvent[];
    variables: PathVariables;
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

        let matchingEvents = this.getMatchingRouterEvents(path);

        matchingEvents.events.forEach((ev: RouterEvent) => {
            ev.action(matchingEvents.variables);
        });

        if (matchingEvents.events.length == 0) {
            this.registeredEvents
                .filter((e) => e.path === "404")
                .forEach((e) => e.action());
        }
    }

    /**
     * Register action which gets executed when path is routed
     */
    public on(path: string, action: RoutedAction) {
        path = this.removeLastSlash(path);

        this.registeredEvents.push({ path, action });
    }
    private normalizePath(path: string): string {
        return path.split("?")[0];
    }
    private clearRootElement() {
        this.rootELement.innerHTML = "";
    }

    private getMatchingRouterEvents(path: string): RouterEventInfo {
        path = this.removeLastSlash(path);

        let data = { events: [], variables: {} } as RouterEventInfo;
        for (const ev of this.registeredEvents) {
            let ps = path.split("/");
            let eps = ev.path.split("/");

            if (ps.length == eps.length) {
                let isSame = true;
                let vars: { [key: string]: string } = {};
                for (let i = 0; i < ps.length; i++) {
                    if (eps[i] != ps[i] && !eps[i].startsWith(":")) {
                        isSame = false;
                    }
                    if (eps[i]) vars[eps[i].substring(1)] = ps[i];
                }
                if (isSame) {
                    data.events.push(ev);
                    data.variables = vars;
                }
            }
        }
        return data;
    }

    private removeLastSlash(path: string) {
        return path.endsWith("/") && path.length > 1
            ? path.substring(0, path.length - 1)
            : path;
    }
}

export default new Router(document.querySelector("#app")!);

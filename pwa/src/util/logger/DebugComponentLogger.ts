import Debug from "../../components/Debug";
import ConsoleLogger from "./ConsoleLogger";

export default class DebugComponentLogger extends ConsoleLogger {
  debugComponent: Debug;
  constructor() {
    super();
    this.debugComponent = document.createElement("zelia-debug") as Debug;
    document.body.append(this.debugComponent);
  }
  log(...x: any[]) {
    super.log(...x);
    this.debugComponent.log?.(...x);
  }

  info(...x: any[]) {
    super.info(...x);
    this.debugComponent.info?.(...x);
  }

  error(...x: any[]) {
    super.error(...x);
    this.debugComponent.error?.(...x);
  }

  warn(...x: any[]) {
    super.warn(...x);
    this.debugComponent.warn?.(...x);
  }

  time(name: string): () => void {
    const end = super.time(name);
    return () => {
      end();
    };
  }
}

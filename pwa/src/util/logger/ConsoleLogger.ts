import Logger from "../../types/Logger";

export default class ConsoleLogger implements Logger {
  log(...x: any[]) {
    console.log(...x);
  }

  info(...x: any[]) {
    console.info(...x);
  }

  error(...x: any[]) {
    console.error(...x);
  }

  warn(...x: any[]) {
    console.warn(...x);
  }

  time(name: string) {
    let start = Date.now();
    console.time(name);

    return () => {
      console.timeEnd(name);
      this.log(name + ": " + (Date.now() - start) + "ms");
    };
  }
}

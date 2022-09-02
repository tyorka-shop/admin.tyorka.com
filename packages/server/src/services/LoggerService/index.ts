import { Container } from "typedi";
import { Config } from "../../config";

export const levels = ["debug", "log", "error"] as const;

export type LogLevel = typeof levels[number];

const levelToNumber = levels.reduce(
  (result, level, index) => ({
    ...result,
    [level]: index,
  }),
  {} as Record<LogLevel, number>
);

export class LoggerService {
  private logLevel: number;
  constructor(private name: string) {
    const config: Config = Container.get('config');
    this.logLevel = levelToNumber[config.logLevel || "error"];
  }

  log(...args: any[]) {
    if (this.logLevel > levelToNumber["log"]) return;
    console.log(`[${this.name}]`, ...args);
  }
  error(...args: any[]) {
    if (this.logLevel > levelToNumber["error"]) return;
    console.error(`[${this.name}] ERR`, ...args);
  }
}

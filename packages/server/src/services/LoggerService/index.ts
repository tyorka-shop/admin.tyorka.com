import { Inject, Service } from "typedi";
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

@Service()
export class LoggerService {
  private logLevel: number;
  constructor(@Inject("config") config: Config) {
    this.logLevel = levelToNumber[config.logLevel || "error"];
  }

  private name: string = "app";

  setName(name: string) {
    this.name = name;
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

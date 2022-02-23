export class LoggerService {
  constructor(private name: string) {}

  log(...args: any[]) {
    console.log(`[${this.name}]`, ...args);
  }
  error(...args: any[]) {
    console.error(`[${this.name}]`, ...args);
  }
}

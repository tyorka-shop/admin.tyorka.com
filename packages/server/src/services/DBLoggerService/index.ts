import { Logger } from 'typeorm'
import { Inject, Service } from 'typedi'
import { LoggerService } from '../LoggerService'

@Service()
export class DBLoggingService implements Logger {

  constructor(@Inject(() => LoggerService) private logger: LoggerService){
    this.logger.setName('db');
  }
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]){
    this.logger.log(query, parameters)
  };
  /**
   * Logs query that is failed.
   */
  logQueryError(error: string | Error, query: string, parameters?: any[]){
    this.logger.error(error)
    this.logger.error(query, parameters)
  };
  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]){
    this.logger.log('time =', time);
    this.logger.log(query, parameters)
  };
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string){
    this.logger.log('(schema build)', message)
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string){
    this.logger.log('(migration)', message)
  };
  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: "log" | "info" | "warn", message: any){
    this.logger.log(message);
  };
}
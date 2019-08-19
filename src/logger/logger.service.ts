import { Logger as NestLogger } from '@nestjs/common';
import { Logger, createLogger, transports, format } from 'winston';
import * as schedule from 'node-schedule';
import * as moment from 'moment';

export class LoggerService {
  private static readonly scheduleTime: schedule.RecurrenceSpecObjLit = {
    hour: 0,
    minute: 0,
  };
  private logger: Logger;

  constructor(private readonly context: string) {
    this.updateLogger();
    schedule.scheduleJob(LoggerService.scheduleTime, () => this.updateLogger());
  }

  private createLogger(): Logger {
    const momentDate = moment().format('YYYY-MM-DD');
    return createLogger({
      format: format.combine(format.prettyPrint()),
      transports: [
        new transports.File({
          filename: `${momentDate}_server-logs.log`,
          dirname: 'logs',
          // TODO check in config service if (production || stage)
          silent: process.env.NODE_ENV !== 'production',
        }),
      ],
    });
  }

  private updateLogger(): void {
    this.logger = this.createLogger();
  }

  private generateMsg(msgObj: any, type: string): string {
    return (msgObj && JSON.stringify(msgObj)) || `no ${type} provided!`;
  }

  log(message: string, body?: any): void {
    NestLogger.log(message, this.context);
    const msg = body ? `${message} ${this.generateMsg(body, 'body')}` : message;
    this.logger.info(msg, {
      timestamp: new Date(),
      context: this.context,
    });
  }

  error(message: string, trace?: any, body?: any): void {
    const traceMsg = this.generateMsg(trace, 'trace');
    const bodyMsg = this.generateMsg(body, 'body');
    NestLogger.error(message, traceMsg, this.context);
    const msg = `${message} -> ${bodyMsg} -> (${traceMsg})`;
    this.logger.error(msg, {
      timestamp: new Date(),
      context: this.context,
    });
  }
}

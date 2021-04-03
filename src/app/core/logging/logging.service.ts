import { Injectable } from "@angular/core";
import { LogLevel } from "./log-level.enum";
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private level: LogLevel = environment.logLevel;

  debug(message: string): void {
    this.writeLog(message, LogLevel.Debug);
  }

  info(message: string): void {
    this.writeLog(message, LogLevel.Info);
  }
  
  warn(message: string): void {
    this.writeLog(message, LogLevel.Warn);
  }

  error(message: string): void {
    this.writeLog(message, LogLevel.Error);
  }

  private writeLog(message: string, level: LogLevel): void {
    if (this.consoleAvailable() && this.isEnabled(level)) {
      switch (level) {
        case LogLevel.Debug:
          console.log(message);
          break;
        case LogLevel.Info:
          console.info(message);
          break;
        case LogLevel.Warn:
          console.warn(message);
          break;
        case LogLevel.Error:
          console.error(message);
          break;
      }
    }
  }

  private consoleAvailable(): boolean {
    return !!window.console;
  }

  private isEnabled(level: LogLevel): boolean {
    return level >= this.level;
  }
}
import { Logger } from "tslog";

const LOG_LEVEL = "warn";

export function loggerFactory(loggerName: string): Logger {
  return new Logger({ name: loggerName, minLevel: LOG_LEVEL });
}

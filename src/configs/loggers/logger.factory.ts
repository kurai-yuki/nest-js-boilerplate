import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { LogFormatEnum } from './log-format.enum';
import { utilities, WinstonModule } from 'nest-winston';

export function LoggerFactory() {
  let consoleFormat;
  const aplicationName = process.env.APPLICATION_NAME || 'MyApp';
  // const logFilePath = process.env.LOG_FILE_PATH;
  // const errorLogFilePath = process.env.ERROR_LOG_FILE_PATH;

  const DEBUG = process.env.DEBUG?.toLocaleLowerCase() === 'true';
  const LOG_FORMAT: LogFormatEnum =
    (process.env.LOG_FORMAT as LogFormatEnum) || LogFormatEnum.DEFAULT;

  if (LOG_FORMAT === LogFormatEnum.JSON) {
    consoleFormat = format.combine(
      format.timestamp(),
      format.json(),
      format.align(),
    );
  } else {
    consoleFormat = format.combine(
      format.timestamp({
        format: 'DD-MM-YYYY hh:mm:ss.sss',
      }),
      // format.errors({ stack: true }),
      format.align(),
      utilities.format.nestLike(aplicationName, {
        appName: true,
        colors: true,
        prettyPrint: true,
        processId: false,
      }),
    );
  }

  // const fileRotateTransport = new transports.DailyRotateFile({
  // filename: `${logFilePath}/${aplicationName}.log`,
  //   datePattern: 'DD-MM-YYYY',
  //   maxFiles: '30d',
  // });

  return WinstonModule.createLogger({
    level: DEBUG ? 'debug' : 'info',
    transports: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      new transports.Console({ format: consoleFormat }),
      // new transports.File({ filename: `${logFilePath}/${aplicationName}.log` }),
      // new transports.File({
      //   filename: `${logFilePath}/${aplicationName}-erros.log`,
      //   level: 'error',
      // }),
    ],
  });
}

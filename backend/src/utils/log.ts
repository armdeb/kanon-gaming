import { Handler } from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

let logger: Handler;

function getLoggerInstance(): Handler {
  if (!logger) {
    const accessLogPath = process.env.ACCESS_LOG || path.join(__dirname, '../../logs/access.log');
    fs.mkdirSync(path.dirname(accessLogPath), { recursive: true });
    const accessLogStream = fs.createWriteStream(accessLogPath, { flags: 'a' });

    logger = morgan('combined', { stream: accessLogStream });
  }

  return logger;
}

export default getLoggerInstance;
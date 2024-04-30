import { Response } from 'express';

export function sendServerError(res: Response, message: string): void {
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.error(message);
    res.status(500).send('Internal server error');
  } else {
    res.status(500).send(message);
  }
}
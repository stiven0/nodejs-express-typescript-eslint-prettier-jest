import { Response } from 'express';

import { ErrorHandle } from '../utils/interfaces/error';

export const handleError = (error: ErrorHandle, res: Response) => {
  const { statusCode = 500 } = error;
  return res.status(statusCode).json({ ...error });
};

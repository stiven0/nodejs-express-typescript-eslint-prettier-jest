import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

import { handleError } from '../utils/handle-error';

const rateLimiterGlobal = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  statusCode: 429,
  handler: (req: Request, res: Response) => {
    return handleError(
      {
        ok: false,
        status: 'Error',
        statusCode: 429,
        message: 'You have made too many requests, you must wait a moment',
      },
      res,
    );
  },
});

export default rateLimiterGlobal;

import { Request, Response } from 'express';

import User from '../../../models/user';

import { handleError } from '../../../utils/handle-error';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersDB = await User.find().lean();
    return res.status(200).json({
      ok: true,
      users: usersDB,
    });
  } catch (error: any) {
    return handleError(
      {
        ok: false,
        status: 'Error',
        statusCode: 400,
        message: error ? error : 'An unexpected error has occurred',
      },
      res,
    );
  }
};

import { Request, Response } from 'express';

import User from '../../../models/user';

import { handleError } from '../../../utils/handle-error';

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email } = req.body;

  try {
    const userDB = await User.findOneAndUpdate({ _id: userId }, { email }, { new: true, runValidators: true });
    return res.status(200).json({
      ok: true,
      user: userDB,
    });
  } catch (error: any) {
    if (error.errors) {
      const errors = error.errors;

      if (errors.email) {
        return handleError(
          {
            ok: false,
            status: 'Error',
            statusCode: 400,
            message: {
              key: 'email',
              error: error.errors.email.properties.message,
            },
          },
          res,
        );
      } else {
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
    }
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

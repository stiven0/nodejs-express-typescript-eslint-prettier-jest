import { Request, Response } from 'express';

import User from '../../../models/user';

import { handleError } from '../../../utils/handle-error';

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const userDeleted = await User.findOneAndDelete({ _id: userId });
    if (userDeleted && userDeleted._id) {
      return res.status(200).json({
        ok: true,
        message: 'The user has been deleted successfully',
      });
    }

    return handleError(
      {
        ok: false,
        status: 'Error',
        statusCode: 400,
        message: 'The action could not be completed',
      },
      res,
    );
  } catch (error: any) {
    return handleError(
      {
        ok: false,
        status: 'Error',
        statusCode: 500,
        message: error ? error : 'An unexpected error has occurred',
      },
      res,
    );
  }
};

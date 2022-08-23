import { Request, Response } from 'express';

import User from '../../../models/user';

import { handleError } from '../../../utils/handle-error';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return handleError(
        {
          ok: false,
          status: 'Error',
          statusCode: 400,
          message: 'You must enter a password',
        },
        res,
      );
    }

    const user = new User({
      email,
      password,
    });

    const userDB = await user.save();
    if (userDB) {
      return res.status(201).json({
        ok: true,
        message: 'Successful registration',
      });
    } else {
      return handleError(
        {
          ok: false,
          status: 'Error',
          statusCode: 400,
          message: 'It was not possible to complete the registration, please try again',
        },
        res,
      );
    }
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
      } else if (errors.password) {
        return handleError(
          {
            ok: false,
            status: 'Error',
            statusCode: 400,
            message: {
              key: 'password',
              error: error.errors.password.properties.message,
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

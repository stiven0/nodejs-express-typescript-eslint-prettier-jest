import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hash } from 'bcryptjs';

import { UserModel } from '../utils/interfaces/user';

const VALID_ROLES = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} not a valid role',
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email: string) => {
          return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
        },
        message: 'The email entered is invalid',
      },
      required: [true, 'You must enter your email'],
    },

    password: {
      type: String,
      minlength: [6, 'The password is too short'],
      validate: {
        validator: (password: string) => {
          return /[a-zA-Z0-9/\W/]{6,}/.test(password);
        },
        message: 'The password is invalid',
      },
      required: [true, 'You must enter a password'],
    },

    role: {
      type: String,
      enum: VALID_ROLES,
      default: 'USER_ROLE',
    },
  },
  { timestamps: true },
);

userSchema.plugin(uniqueValidator, { message: 'You must choose another email' });

// encrypt password before of saving
userSchema.pre('save', function (this: UserModel, next: () => void) {
  hash(this.password, 10, (err, hash) => {
    if (!err) {
      this.password = hash;
      next();
    }
  });
});

// method to omit password when returning requests
userSchema.methods.toJSON = function () {
  const userObject: Partial<UserModel> = this.toObject();
  delete userObject.password;
  return userObject;
};

export default model<UserModel>('user', userSchema);

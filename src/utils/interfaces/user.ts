import { Schema, Document } from 'mongoose';

export interface UserModel extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

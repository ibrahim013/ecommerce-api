import mongoose from 'mongoose';
import { isEmail } from 'validator';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    access: {
        type: String,
        enum:['admin', 'user'],
        default: 'user',
    }
  },

  { timestamps: true }
);

export const User = model('user', userSchema);

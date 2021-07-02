import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String
    }
  
  },

  { timestamps: true }
);

export const Category = model('category', categorySchema);

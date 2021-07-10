import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = `${process.env.DATABASE_URL}`;
const databaseConnection = {
  getConnect: () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Database connected successfully'))
      .catch((err) => console.log(err));
  },
};

export default databaseConnection;

import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'hello world',
  });
});

//create

//read
app.use('/users', userRouter);
app.use('/products', productRouter)
app.use('/cart', cartRouter)

export default app
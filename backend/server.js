import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import ProductRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connect to db'))
  .catch((err) => console.log(err.message));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //by using this, form data in the post request will be converted to json object inside rec.body
app.use('/api/seed', seedRouter);
app.use('/api/products', ProductRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;

//when there is error in expressasynchandler, this middleware will run and error message will be returned to the user
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Serve to port http://localhost:${port} `);
});

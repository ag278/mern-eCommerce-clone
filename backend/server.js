import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import ProductRouter from './routes/productRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connect to db'))
  .catch((err) => console.log(err.message));

const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/products', ProductRouter);




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve to port http://localhost:${port} `);
});

import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  //whenever there is a get call from frontend at this url, the backend will send the data file stored
  res.send(data.products);
});   

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve to port http://localhost:${port} `);
});

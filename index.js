import express from 'express'
import dataRouter from './router/data.js';

const app = express()
app.use(express.json())

app.use('/data', dataRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(4508, async () => {
  console.log('aa')
})
import express from 'express'
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'waccount-book',
  password: 'Leejaesu!2',
});

export const db = pool.promise();
// 임시 query
export async function getData() {
  return db
    .execute('INSERT INTO data (date, amount, summary, memo) VALUES(?,?,?,?)', [
      new Date(),
      100000,
      'test3',
      'testestestestestestestestes'
    ]) //
    .then((result) => result);
}

const app = express()

app.get('/', (req, res) => {
  console.log(req.query)
  return res.json({
    first: 1
  })
})

app.listen(4508, async () => {
  console.log('aa')
})
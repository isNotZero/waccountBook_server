import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'waccount-book',
  password: 'Leejaesu!2',
  dateStrings: ['DATE']
});

export const db = pool.promise();
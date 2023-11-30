import { db } from '../db/mysql.js';

export async function getData(id) {
  return db
    .execute(`SELECT * FROM data ${id ? `WHERE id = ${id}` : ''} ORDER BY date DESC, time DESC`) //
    .then((result) => result[0]);
}

export async function create(date, time, amount, summary, memo) {
  return db
    .execute('INSERT INTO data (date, time, amount, summary, memo) VALUES(?,?,?,?,?)', [
      date,
      time,
      amount,
      summary,
      memo,
    ])
    .then((result) => result[0].insertId);
}

export async function update(id, keys, values) {
  return db
    .execute(`UPDATE data SET ${keys} WHERE id=?`, [...values, id])
    .then(() => getData(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM data WHERE id=?', [id]);
}

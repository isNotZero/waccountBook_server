import * as dataRepository from '../data/data.js';

export async function getData(req, res) {
  const { id } = req.query
  const data = await dataRepository.getData(id);
  res.status(200).json(data);
}

export async function createData(req, res, next) {
  const date = new Date()
  const { amount, summary, memo } = req.body
  const result = await dataRepository.create(date, amount, summary, memo);
  res.status(201).json(result);
}

export async function updateData(req, res, next) {
  const { id } = req.params;
  const { body } = req
  const data = await dataRepository.getData(id);
  if (!data.length) {
    return res.status(404).json({ message: `data not found: ${id}` });
  }
  const keys = Object.keys(body).map(key => `${key}=?`).join()
  const values = Object.values(body)
  // if (tweet.userId !== req.userId) {
  //   return res.sendStatus(403);
  // }
  const updated = await dataRepository.update(id, keys, values);
  res.status(200).json(updated);
}

export async function deleteData(req, res, next) {
  const id = req.params.id;
  const data = await dataRepository.getData(id);
  if (!data.length) {
    return res.status(404).json({ message: `data not found: ${id}` });
  }
  // if (tweet.userId !== req.userId) {
  //   return res.sendStatus(403);
  // }
  await dataRepository.remove(id);
  res.sendStatus(204);
}

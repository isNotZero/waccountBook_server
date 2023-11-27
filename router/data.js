import express from 'express';
import * as dataController from '../controller/data.js';

const router = express.Router();

// GET /data
// GET /data?id=:id
router.get('/', dataController.getData);

// POST /data
router.post('/', dataController.createData);

// PATCH /data/:id
router.patch('/:id', dataController.updateData);

// DELETE /tweets/:id
router.delete('/:id', dataController.deleteData);

export default router;

import authUser from '../auth/verifyToken.js'
import express from 'express';
import TaskController from '../controller/task.js';

const router = express.Router();
const {
  find,
  create,
  edit,
  destroy,
  allTasksFromTetramino,
  allTaskFromDay
} = TaskController

router.get('/find/:id', authUser, find)

router.get('/tetramino/:tetramino', authUser, allTasksFromTetramino);

router.get('/:day', authUser, allTaskFromDay)

router.post('/:tetramino', authUser, create)

router.put('/:id', authUser, edit);

router.delete('/:id', authUser, destroy);


export default router;

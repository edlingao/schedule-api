import authUser from '../auth/verifyToken.js'
const router = express.Router();
import express from 'express';
import UserController from '../controller/user.js'
import ScheduleController from '../controller/schedule.js'

const { getAllSchedules } = UserController
const { scheduleDays, create, destroy } = ScheduleController

router.get('/', authUser , getAllSchedules );

router.get('/:day', authUser ,scheduleDays);

router.post('/', authUser, create);

router.delete('/:id', authUser, destroy);

export default router;

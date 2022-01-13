import { Router } from 'express'
import UserController from '../controller/user.js'

const { register, logIn } = UserController
const router = Router() 


router.post('/register', register)

router.post('/login', logIn)

export default router
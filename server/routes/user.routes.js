import {Router} from 'express'
import { login, signup, uploadFile} from '../controllers/user.controller.js'
import upload from '../middlewares/upload.js'

const userRouter = Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/upload', upload.single("file"), uploadFile)


export default userRouter
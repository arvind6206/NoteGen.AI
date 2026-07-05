import {Router} from 'express'

const userRouter = Router()

userRouter.post('/signup', userController)

export default userRouter
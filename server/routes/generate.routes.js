import {Router} from 'express'
import authMiddleware from '../middlewares/auth.js'
import { generateNotes } from '../controllers/generate.controller.js'

const genRouter = Router()

genRouter.post('/generate-notes', authMiddleware, generateNotes)


export default genRouter
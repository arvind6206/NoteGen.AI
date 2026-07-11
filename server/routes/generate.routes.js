import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import { deleteNotesById, generateNotes, getNotesById, getUserNotes } from "../controllers/generate.controller.js";

const genRouter = Router();

genRouter.post(
    "/generate-notes",
    authMiddleware,
    generateNotes
);

genRouter.get('/generate-notes', authMiddleware, getUserNotes)
genRouter.get('/generate-notes/:id', authMiddleware, getNotesById)
genRouter.delete('/generate-notes/:id', authMiddleware, deleteNotesById)


export default genRouter;
import { Router } from "express";

import authMiddleware from "../middlewares/auth.js";

import { generateNotes, getUserNotes } from "../controllers/generate.controller.js";

const genRouter = Router();

genRouter.post(
    "/generate-notes",
    authMiddleware,
    generateNotes
);

genRouter.get('/generate-notes', authMiddleware, getUserNotes)

export default genRouter;
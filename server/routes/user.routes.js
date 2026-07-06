import { Router } from "express";
import { signup, login, uploadFile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadFile
);

export default userRouter;
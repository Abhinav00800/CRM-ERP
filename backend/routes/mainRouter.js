import express from "express"
import userRouter from "./usersRouter"

export const mainRouter = express.Router()

mainRouter.use('/user',userRouter);
mainRouter.use('/project',)
import express from "express";
import cors from 'cors'
import {
    postUserController,
    getUserController,
    loginController,
    getUserByIdController,
    updateUserContoller,
    removeUserController
} from '../Controller/userController.js';
export const userRoutes = express.Router()
userRoutes.use(cors());

userRoutes.post('/user-register', postUserController)
userRoutes.get("/get-user", getUserController);
userRoutes.post("/user-login", loginController);
userRoutes.get("/get-user-by-id/:id", getUserByIdController);
userRoutes.put("/update-user/:id", updateUserContoller);
userRoutes.delete("/remove-user/:id", removeUserController)
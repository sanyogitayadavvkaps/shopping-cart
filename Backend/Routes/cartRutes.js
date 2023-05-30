import express from "express";
import auth from '../middleware/auth.js'
import cors from 'cors'
import { deleteCartController, getCartController, postCartController } from "../Controller/cartController.js";
export const cartRoutes = express.Router()
cartRoutes.use(cors());

cartRoutes.post('/insert-cart',postCartController)
cartRoutes.get('/get-cart', getCartController)
cartRoutes.delete('/remove-cart/:productId',auth,deleteCartController)


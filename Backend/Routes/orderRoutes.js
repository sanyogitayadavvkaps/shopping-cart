import express from "express";
import cors from 'cors'
import { paymentController, postOrderController, webHookController } from "../Controller/orderController.js";
import auth from "../middleware/auth.js";
export const orderRoutes = express.Router()
orderRoutes.use(cors());

// orderRoutes.post('/post-order',postOrderController)






orderRoutes.post('/create-checkout-session',auth, paymentController);
orderRoutes.post('/post-order', postOrderController);
orderRoutes.post('/webhook', express.raw({type: 'application/json'},),webHookController)



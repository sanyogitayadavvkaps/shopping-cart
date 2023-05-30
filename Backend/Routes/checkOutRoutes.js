import express from "express";
import cors from 'cors'
import { postCheckOutController } from "../Controller/checkOutController.js";
export const checkoutRoutes = express.Router()
checkoutRoutes.use(cors());


checkoutRoutes.post('/check-out',postCheckOutController)
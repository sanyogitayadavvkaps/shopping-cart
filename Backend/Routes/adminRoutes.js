import express from 'express'
import cors from 'cors'
import { admiLoginController ,admingetIdController} from '../Controller/adminController.js'
 export const adminRoutes = express.Router()
 adminRoutes.use(cors())


adminRoutes.post('/admin/login',admiLoginController)
adminRoutes.get('/admin/get/id/:id',admingetIdController)



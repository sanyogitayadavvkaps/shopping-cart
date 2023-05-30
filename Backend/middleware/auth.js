import jwt from 'jsonwebtoken'
import { User } from '../Model/userModel.js';
const SECRET_KEY = "QWERTYUIOPASDFGHJKLZXCVBNM";
const auth = async (req, res, next) => {
  try {
    console.log("Authorization",req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(decoded.userId)

    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).json({ success: false, error: 'Please authenticate!' })
  }
}

export default auth;
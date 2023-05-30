// const mongoose = require("mongoose");
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
const SECRET_KEY = "QWERTYUIOPASDFGHJKLZXCVBNM";
const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
  },
});
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
const Admin = mongoose.model("admindetail", adminSchema);

export const adminLoginModel = async ({ body }) => {
  const password = body?.password;
  const email = body?.email;
  if (!(body?.password && body?.email)) {
    return { message: "All Fields Required" };
  }
  try {
    const isExist = await Admin.findOne({
      email: body.email,
    });
    if (!isExist) {
      return { error: "User not found" };
    }
    const match = await bcrypt.compare(password, isExist.password);
    if (!match) {
      return { passwordError: "Incorrect password" };
    }
    if (match) {
      const { email, password, _id } = isExist;
      const UserDataClone = { email, password, _id };
      const token = jwt.sign({ userId: _id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      UserDataClone.token = token;
      return {
        data: UserDataClone,
        auth: true,
        message: "Succes",
        status: 200,
      };
    } else {
      return { error: "Credential not matchecd" };
    }
  } catch (err) {
    return { message: err, status: 500 };
  }
};

export const admingetIdModel = async(id) =>{
  try{
    const res = await Admin.findById(id)
    return {
      data: res,
      message: "Succes",
      status: 200,
    };

} catch (err) {
  return { message: err, status: 500 };
}
}
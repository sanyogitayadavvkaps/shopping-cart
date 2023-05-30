import { postCheckOutModel } from "../Model/checkOutModel.js";

 
export const postCheckOutController = async (req, res) => {
    const body = req?.body
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    try {
        const data = await postCheckOutModel(body)
        res.send(data)
    }
 catch (err) {
    console.log("DATA=>",err)
    res.send(err);
  }
 }
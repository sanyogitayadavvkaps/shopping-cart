import { deleteCartModel, getCartModel, postCartModel } from "../Model/cartModel.js";

export const postCartController = async (req, res) => {
    const body = req?.body
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    try {
        const data = await postCartModel(body)
        res.send(data)
    }
 catch (err) {
    console.log("DATA=>",err)
    res.send(err);
  }
}

export const getCartController = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    try {
      const data = await getCartModel();
      res.send(data);
    } catch (err) {
      console.log("ERROR=>",err);
      res.send(err);
    }
}

export const deleteCartController = async (req, res) => {
  const {productId} = req.params
  const userId = req.user._id
    try{
      const data = await deleteCartModel(productId,userId)
      res.send(data)
    }
    catch(err){
      res.send(err)
    }
}
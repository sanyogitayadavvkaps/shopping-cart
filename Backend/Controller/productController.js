import { postProductModel,getProductModel, getProuctByIdModel, updateProductModel, removeProductModel } from "../Model/prouctModel.js";
import Stripe from 'stripe'
import ProductPayment from "../Model/productPaymentModel.js";
  
const stripe = Stripe("sk_test_51N8d7pSHRFJip0sQLOn052ovZvJZhE1CFVmIgjP8eimq5rrixsjj3klccd08MjLxvRTRdqF819eDKs2SMkf9NaNh00lfu17gW1")
 export const postProuctController = async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const body = req?.body;
    const productImage = req?.file?.filename;
  
    try {
      const data = await postProductModel({ body, productImage });
      res.send(data);
    } catch (err) {
      console.log("DATA=>",err)
      res.send(err);
    }
}


export const getProductController = async(req,res) =>{
  const search = req?.query?.search;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = (pageNumber - 1) * pageSize;
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    try {
      const data = await getProductModel(search, pageSize, startIndex);
      res.send(data);
    } catch (err) {
      console.log("ERROR=>",err);
      res.send(err);
    }
}
//getProuctByIdModel

export const  getProductByIdController = async(req,res)=>{
  const {id} = req.params
  try{
      const data = await getProuctByIdModel(id)
      res.send(data)
  }
  catch(err){
      res.send(err)
  }
}

export const updateBlogController = async (req, res) => {
  const id = req?.params?.id;
  const { body } = req;
  const productImage = req?.file?.filename;
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const data = await updateProductModel(id, { body, productImage });
    res.send(data);
  }
  catch (err) {
    res.send(err);
  }
}
  


export const removeProductController = async(req,res)=>{
  const {id} = req.params
  try{
    const data = await removeProductModel(id)
    res.send(data)
  }
  catch(err){
    res.send(err)
  }
}

export const ProductPaymentController = async (req, res) => {
  console.log("req.body.totalPrice+>",req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      metadata: {
        userId: req.body.userId,
      },
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Premium Blogs Subscription',
          },
          unit_amount: req.body.amount *100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/succes',
      cancel_url: 'http://localhost:3000/',
    });
    
    // Store the payment data in the database
    req.user.isPaid = true;
    await req.user.save();
    
    const payment = new ProductPayment({
      userId: req.body.userId,
      transactionId: session.id,
      amount: req.body.amount,
    });
    await payment.save();
    
    res.status(200).send({
      url: session.url,
    });
  } catch (error) {
    console.error("error",error);
    res.status(500).send('Internal Server Error');
  }
  
}

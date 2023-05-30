import mongoose from 'mongoose'
import stripe from 'stripe';

const orderSchemas = mongoose.Schema({
  cardHolderName: {
    type:String
      
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"userdetails"
    },
    amount:{
        type:Number
    },
    transactionId:{
        type:String
  },
  cardNumber: {
      type:Number
  },
  expire: {
    type:String
    
  },
  
})

const Order = mongoose.model('order',orderSchemas)

// const { STRIPE_SECRET_KEY } = process.env; // Replace with your actual Stripe secret key
const STRIPE_SECRET_KEY = "sk_test_51N8d7pSHRFJip0sQLOn052ovZvJZhE1CFVmIgjP8eimq5rrixsjj3klccd08MjLxvRTRdqF819eDKs2SMkf9NaNh00lfu17gW1"
const stripeClient = new stripe(STRIPE_SECRET_KEY);


export const postOrderModel = async (body) => {
    try {
      const { cardHolderName, amount ,cardNumber} = body;
    
  
      // Create a new Stripe payment intent
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: amount * 100, // Stripe accepts amounts in cents, so multiply by 100
        currency: 'INR', // Replace with your desired currency code
      });
  
      // Save the order details to the database
      const order = new Order({
        cardNumber,
        cardHolderName,
        amount,
        transactionId: paymentIntent.id,
      });
      await order.save();
  
      // Return the client secret for the payment intent
      return { data: paymentIntent.client_secret ,status:200};
    } catch (error) {
      // Handle any errors
      console.error(error);
      throw error;
    }
  };
  
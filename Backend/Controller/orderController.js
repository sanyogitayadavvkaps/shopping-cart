import {
  postOrderModel
} from "../Model/orderModel.js"
import Stripe from 'stripe'
import Payment from "../Model/paymentModel.js";
const stripe = Stripe("sk_test_51N8d7pSHRFJip0sQLOn052ovZvJZhE1CFVmIgjP8eimq5rrixsjj3klccd08MjLxvRTRdqF819eDKs2SMkf9NaNh00lfu17gW1")

export const postOrderController = async (req, res) => {
  const {
    amount
  } = req.body;
  try {
    const data = await postOrderModel({
      amount
    })
    console.log("data", data)
    res.send(data)
  } catch (err) {
    console.log("err", err)

    res.send(err)
  }
}



export const paymentController = async (req, res) => {
  console.log('BODy=>', req.body.userId);
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
        unit_amount: 50000,
      },
      quantity: 1,
    }, ],
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout-success',
    cancel_url: 'http://localhost:3000/',
  });
  console.log("session=>", req.user.isPaid);
  // Store the payment data in the database

  req.user.isPaid = true
  req.user.save()
  const payment = new Payment({
    userId: req.body.userId,
    transactionId: session.id,
    amount: req.body.total,
  });
  await payment.save();

  res.send({
    url: session.url,
  });
};





export const webHookController = (req, res) => {
  let data;
  let eventType;
  const sig = req.headers['stripe-signature'];


  let endpointSecret;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook Veryfied");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);

      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;

  } else {
    data = req.body.data.object;
    eventType = req.body.type
  }


  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        console.log("customer", customer);
        console.log("data", data);

        try {
          // CREATE ORDER
          createOrder(customer, data);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  res.status(200).end();
}
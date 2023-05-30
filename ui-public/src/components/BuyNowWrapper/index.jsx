import React, { useState } from 'react';
import MainLayout from '../layoutes/MainLayout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "@mui/material/Button";
import { postRequest } from '../../ApiFunctions';
import * as yup from 'yup';

const schema = yup.object().shape({
  cardHolderName:yup.string().required('Card Honlder Name is required'),
  cardNumber: yup.string().required('Card number is required'),
  Cvv: yup.string().matches(/^\d{3}$/, 'CVV must be a 3-digit number').required('CVV is required'),
  expire: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be in the format MM/YY').required('Expiration date is required'),
  amount: yup.number().positive('amount must be a positive number').required('amount is required'),
});


const BuyNow = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // const [amount, setamount] = useState(0);

  const OnSubmit = async (data) => {
    const { amount, ...rest } = data; // Extract the amount value from form data
    const requestData = { ...rest, amount: parseInt(amount) }; // Convert amount to an integer
  
    try {
      await postRequest('/post-order', amount);
      console.log('Payment succeeded');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };
  
  return (
    <MainLayout>
      <div className="checkout-panel" style={{marginTop:"2rem",display:"flex",justifyContent:"center"}}>
        <form onSubmit={handleSubmit(OnSubmit)}>
        <div className="form-control">
            <label>Card Holder:</label>
            <input type="text" {...register('cardHolderName')} />
            {errors.cardHolderName && <p className='text-danger'>{errors.cardHolderName.message}</p>}
          </div>

          <div className="form-control">
            <label>Card Number:</label>
            <input type="text" {...register('cardNumber')} />
            {errors.cardNumber && <p className='text-danger'>{errors.cardNumber.message}</p>}
          </div>

          <div className="form-control">
            <label>CVV:</label>
            <input type="text" {...register('Cvv')} placeholder="123" />
            {errors.Cvv && <p className='text-danger'> {errors.Cvv.message}</p>}
          </div>

          <div className="form-control">
            <label>Expiration Date:</label>
            <input type="text" {...register('expire')} placeholder="MM/YY" />
            {errors.expire && <p className='text-danger'>{errors.expire.message}</p>}
          </div>

          <div className="form-control">
            <label>amount:</label>
            <input type="text" {...register('amount')} />
            {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
          </div>

          <Button type='submit'variant="contained" color="success">Pay</Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default BuyNow;



     // const amountdata = Number(
      //   data?.amount.toFixed(2)
      //   //             tableById?.data?.attributes?.table_price.toFixed(2)
      //             );
      // let amounts=(data?.amount).toFixed(2)
      // const response = await fetch('http://localhost:9000/api/post-order', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ amount,cardHolderName }),
      // });
      // console.log("response=>",response);

      // if (response.ok) {
      //   const { data } = await response.json();
        // Use the client secret for the payment intent to complete the payment on the client-side
        // See the next step for how to handle the payment on the client-side
        // For example, you can use the Stripe.js library to handle the payment
        // Pass the client secret to the Stripe.js library to complete the payment
        // Example: stripe.confirmCardPayment(data.client_secret, { payment_method: { card: cardElement } })
        // console.log('Payment succeeded');
      // } else {
      //   console.error('Payment failed');
      // }



// import MainLayout from '../layoutes/MainLayout';
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { ConnectedFocusError } from "focus-formik-error";
// import valid from "card-validator"

// const fields = {
//   creditcard: "",
//   expiry: "",
//   cvv: "",
//   name: "",
//   email: "",
//   amount:""
//   // termsAndCondition: false
// };

// const DisplayingErrorMessagesSchema = Yup.object().shape({
//   creditcard: Yup.string()
//     .test(
//       "test-number",
//       "Credit Card number is invalid",
//       (value) => valid.number(value).isValid
//     )
//     .required("Card number is required"),
//   expiry: Yup.string()
//     .typeError("Not a valid expiration date. Example: MM/YY")
//     .max(5, "Not a valid expiration date. Example: MM/YY")
//     .matches(
//       /([0-9]{2})\/([0-9]{2})/,
//       "Not a valid expiration date. Example: MM/YY"
//     )
//     .required("Expiry date is required."),
//   cvv: Yup.string().min(3).max(4).required("CVV is required."),
//   amount: Yup.string().required("Amount is required."),
//   name: Yup.string().required("Name is required."),
//   email: Yup.string().email("Invalid email").required("email is required."),
// });


// const BuyNow = () => {



//   const handleSubmit = async (data) => {

//     try {
//       console.log("data", data)
//       const amountdata = data?.amount
 

//       let withoutSpace = data?.creditcard.replaceAll(" ", "");

//       const dataamount    = data?.expiry.split("/");
     

//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//       myHeaders.append(
//         "Authorization",
//         `Bearer sk_test_51N8d7pSHRFJip0sQLOn052ovZvJZhE1CFVmIgjP8eimq5rrixsjj3klccd08MjLxvRTRdqF819eDKs2SMkf9NaNh00lfu17gW1`
//       );

//       var urlencoded = new URLSearchParams();
//       urlencoded.append("card[number]", withoutSpace);
//       urlencoded.append("card[exp_month]", Number(dataamount[0]));
//       urlencoded.append("card[exp_year]", Number(dataamount[1]));
//       // urlencoded.append("card[cvc]", data?.cvv);

//       var requestOptions1 = {
//         method: "POST",
//         headers: myHeaders,
//         body: urlencoded,
//         redirect: "follow",
//       };

//       fetch("https://api.stripe.com/v1/tokens", requestOptions1)
//         .then((response) => response.text())
//         .then((result) => {
//           const data = JSON.parse(result);
//           console.log("stripeData", data);
        
//           // if (!data.error) {
//             var myHeaders = new Headers();
//             // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//       myHeaders.append(
//         "Authorization",
//         `Bearer sk_test_51N8d7pSHRFJip0sQLOn052ovZvJZhE1CFVmIgjP8eimq5rrixsjj3klccd08MjLxvRTRdqF819eDKs2SMkf9NaNh00lfu17gW1`
//       );
//             myHeaders.append(
//               "Content-Type",
//               "application/x-www-form-urlencoded"
//             );
//             // const amountdata = Number(
//             //   amountdata
//             // );
//             var urlencoded = new URLSearchParams();
//             urlencoded.append("amount", String(Math.floor(amountdata)));
//             urlencoded.append("currency", "USD");
//             urlencoded.append("source", data.id);

//             var requestOptions = {
//               method: "POST",
//               headers: myHeaders,
//               body: urlencoded,
//               redirect: "follow",
//             };

//             fetch("https://api.stripe.com/v1/charges", requestOptions)
//               .then(async (response) => {
//                 if (response.status === 200) {
//                   let res = await response.json()
//                   console.log("responseewtr", res)
//                 }
//               })
//               .catch((err) => {
//                 console.log("charges",err)
//               })
//           // }
//             }).catch((err) => {
//               console.log(err)
//             })

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <MainLayout>
//       {/* <h1>Payment Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Amount:
//           <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         </label>
//         <label>Card Holder:</label>
//         <input type="text" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)}/>
//         <button type="submit">Pay</button>
//       </form> */}
//        <section className="form-section pt-5">
//           <div className="container">
//             <div className="text-holder">
//               <h2 className="font-bold">Payment</h2>
//               {/* <form action="#"> */}
//               <Formik
//                 initialValues={fields}
//                 validationSchema={DisplayingErrorMessagesSchema}
//                 onSubmit={(values, { resetForm }) =>
//                   handleSubmit(values, resetForm)
//                 }
//               >
//                 {({ errors, touched, setFieldValue }) => (
//                   <Form>
//                     <ConnectedFocusError />
//                     <div className="content-holder">
//                       <div className="text-box">
//                         <span className="text">
//                           Want to use another payment?
//                         </span>
//                         {/* <span className="text">
//                           We accept
//                           <ul className="list">
//                             <li>
//                               <img alt="" src={ImageIcon01} width={16} />
//                             </li>
//                             <li>
//                               <Image alt="" src={ImageIcon02} width={16} />
//                             </li>
//                             <li>
//                               <Image alt="" src={ImageIcon03} width={16} />
//                             </li>
//                           </ul>
//                           and more
//                         </span>
//                         <span className="text"> */}
//                           {/* Call or text{" "} */}
//                           {/* <i className="ico icon-arrow-right text-primary"></i>
//                           <Link href="tel:(123) 456-7891">(123) 456-7891</Link> */}
//                         {/* </span> */}
//                       </div>
//                       {/* <button
//                         className="btn btn-dark has-icon"
//                         type="button"
//                         onClick={handleClick}
//                       >
//                         Pay With Crypto
//                         <Image alt="" src={ImageIcon04} width={24} />
//                       </button> */}
                    
                   
//                       <div>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="form-group">
//                               <label for="card1">Name On Card</label>
//                               <div className="input-box">
//                                 <Field
//                                   id="card1"
//                                   className="form-control"
//                                   type="text"
//                                   placeholder="First Last"
//                                   name="name"
//                                 />
//                                 {errors.name && touched.name && (
//                                   <div className="text-danger">{errors.name}</div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="form-group">
//                               <label for="card2">Email Address</label>
//                               <div className="input-box">
//                                 <Field
//                                   name="email"
//                                   id="card2"
//                                   className="form-control"
//                                   // type="email"
//                                   placeholder="example@gmail.com"
//                                 />
//                                 {errors.email && touched.email && (
//                                   <div className="text-danger">{errors.email}</div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           <div className="col-md-6">
//                             <div className="form-group">
//                               <label for="card2">Card Number</label>
//                               <div className="input-box">
//                                 <Field
//                                   name="creditcard"
//                                   id="card2"
//                                   className="form-control"
//                                   type="text"
//                                   placeholder="#### #### #### ####"
//                                 />
//                                 {errors.creditcard && touched.creditcard && (
//                                   <div className="text-danger">
//                                     {errors.creditcard}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="form-group">
//                               <label for="expiration">Expiration</label>
//                               <div className="input-box">
//                                 <Field
//                                   name="expiry"
//                                   id="expiration"
//                                   className="form-control"
//                                   type="text"
//                                   placeholder="MM/YY"
//                                 />
//                                 {errors.expiry && touched.expiry && (
//                                   <div className="text-danger">{errors.expiry}</div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-6">
//                             <div className="form-group">
//                               <label for="security">Security</label>
//                               <div className="input-box">
//                                 <Field
//                                   id="security"
//                                   className="form-control"
//                                   type="text"
//                                   placeholder="CVV"
//                                   name="cvv"
//                                 />
//                                 {errors.cvv && touched.cvv && (
//                                   <div className="text-danger">{errors.cvv}</div>
//                                 )}
//                               </div>
//                             </div>
//                         </div>
//                         <div className="col-6">
//                             <div className="form-group">
//                               <label for="security">Security</label>
//                               <div className="input-box">
//                                 <Field
//                                   id="amount"
//                                   className="form-control"
//                                   type="text"
//                                   placeholder="amount"
//                                   name="amount"
//                                 />
//                                 {errors.amount && touched.amount && (
//                                   <div className="text-danger">{errors.amount}</div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="btn-holder flex d-flex pt-3">
//                           <a className="btn btn-gray sm-btn" href="#">
//                             Back
//                           </a>
//                           <button
//                             type="submit"
//                             className="btn btn-primary btn-flex w-100"
//                           >
//                             Reserve
//                             <span>
//                               {/* ${tableById?.data?.attributes?.table_price} */}
//                             </span>
//                           </button>
//                         </div>
//                     </div>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//               {/* </form> */}
//             </div>
//           </div>
//         </section>
//     </MainLayout>
//   );
// };

// export default BuyNow;
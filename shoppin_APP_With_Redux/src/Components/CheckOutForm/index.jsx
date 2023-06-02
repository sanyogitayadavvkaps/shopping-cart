import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { postRequest } from '../../Api'
import { CategoryContext } from '../../App'
import MainLayOutes from '../../layoute/MainLayOutes'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
  .string()
  .required("Mobile is required")
  .matches(/^[6|8|9]\d{9}$/, "Mobile number is not valid"),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  orderNotes: yup.string()
});

export default function CheckOutForm() {
  const[totalprice,setTotalprice] = useState(0)
  const token = localStorage.getItem("user_token")
  const userId = localStorage.getItem("user_id")
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowPopup(true);
    }
  }, []);
  const history  = useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const cart = useContext(CategoryContext)
  const { allGetCart } = cart
  const [selectData, setSelectData] = useState('')
  const countryData = ["Afghanistan", "India", "Algeria", "bangladesh", "Ghana", "Albania", "Bahrain", "Colombia", "Dominican Republic"]
 
  const addData = async (value) => {
    console.log("totalprice=>",totalprice);
    const res = await axios.post('http://localhost:9000/api/v1/create-checkout-session', {
      userId: userId,
      amount:totalprice
  },
  {
      headers: {
        Authorization:`Bearer ${token}`
      }
  // user: (JSON.parse(Cookies.get('user')))._id
  });


  if(res.data.url){
      window.location.href = res.data.url;
  }
    console.log("VALUE=>", value)
    const {
      firstName,
      lastName,
      email,
      phone,
      state,
      pincode,
      orderNotes,
      country,
      cuponCode,
      address
    } = value
    const response= await postRequest('/check-out', {
      allGetCart: allGetCart, // Pass the allGetCart array
      firstName,
      lastName,
      email,
      phone,
      state,
      pincode,
      orderNotes,
      country,
      cuponCode,
      address
    
    }
    
    )
    if(response.status===200)
    {
      toast.success("successfully");
      history('/succes')
     }
     else {
      toast.error("Opp's Wrong..");
    }
  
  }


  const calculateSubtotal = () => {
    if (allGetCart.length === 0) {
      return 0;
    }
  
    const subtotal = allGetCart.reduce((subtotal, product) => {
      const productSubtotal = (product.price * product.noOfProucts);
      return isNaN(productSubtotal) ? subtotal : subtotal + productSubtotal;
    }, 0);
  
    return subtotal;
  }

  useEffect(() => {
    const subtotal = calculateSubtotal();
    setTotalprice(subtotal || 0); // Update the state with a default value if subtotal is falsy
  }, [allGetCart]);


  return (
    <MainLayOutes>
      <div className="bg-light py-3">
  <div className="container">
    <div className="row">
      <div className="col-md-12 mb-0">
        <NavLink to={'/'}>Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
        <NavLink to={'/add-to-cart'}>Cart</NavLink> <span className="mx-2 mb-0">/</span>{" "}
        <strong className="text-black">Checkout</strong>
      </div>
    </div>
  </div>
</div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
            {showPopup && (
        <div className="border p-4 rounded" role="alert">
          Returning customer? <NavLink to={'/login'}>Click here</NavLink> to login
        </div>
      )}
            </div>
          </div>

          <div className="row">

            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              <div className="p-3 p-lg-5 border">
                <form onSubmit={handleSubmit(addData)}>
                  <div className="form-group">
                    <label htmlFor="c_country" className="text-black">
                      Country <span className="text-danger">*</span>
                    </label>
                    <select
                      id="c_country"
                      className="form-control"
                      defaultValue=""
                      value={selectData}
                      
                      {...register('country', {
                        onChange: (e) => {setSelectData(e.target.value)},
                       
                      })} 
                    >
                      <option value="">Select a country</option>
                      {countryData.map((d, i) => (
                        <option value={d} key={i}>
                          {d}
                        </option>
                      ))}
                    </select>
                 
                    {errors.country && <p className="text-danger">{errors.country.message}</p>}
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        {...register('firstName')}
                      />
                         {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_lname" className="text-black">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_lname"
                        name="c_lname"
                        {...register('lastName')}
                      />
                       {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="address" className="text-black">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Street address"
                        {...register('address')}
                      />
                       {errors.address && <p className="text-danger">{errors.address.message}</p>}

                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apartment, suite, unit etc. (optional)"
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="state" className="text-black">
                        State / Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        {...register('state')}
                      />
                       {errors.state && <p className="text-danger">{errors.state.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="pincode" className="text-black">
                        Posta / Zip <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        {...register('pincode')}

                      />
                       {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}

                    </div>
                  </div>
                  <div className="form-group row mb-5">
                    <div className="col-md-6">
                      <label htmlFor="email" className="text-black">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        {...register('email')}
                      />
                       {errors.email && <p className="text-danger">{errors.email.message}</p>}

                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="text-black">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        {...register('phone')}
                      />
                           {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="orderNotes" className="text-black">
                      Order Notes
                    </label>
                    <textarea
                      name="orderNotes"
                      id="orderNotes"
                      cols={30}
                      rows={5}
                      className="form-control"
                      placeholder="Write your notes here..."
                      {...register('orderNotes')}
                    />
                           {errors.orderNotes && <p className="text-danger">{errors.orderNotes.message}</p>}

                  </div>
                  <div className="form-group">
                      <button
                        className="btn btn-primary btn-lg py-3 btn-block"
                        type='submit'
                      >
                        Place Order
                      </button>
                    </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                  <div className="p-3 p-lg-5 border">
                    <label htmlFor="c_code" className="text-black mb-3">
                      Enter your coupon code if you have one
                    </label>
                    <div className="input-group w-75">
                      <input
                        type="text"
                        className="form-control"
                        id="c_code"
                        placeholder="Coupon Code"
                        aria-label="Coupon Code"
                        aria-describedby="button-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          id="button-addon2"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allGetCart?.length && allGetCart?.map((value, i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td>
                                  {value.productName}
                                  <strong class="mx-2">-{value.noOfProucts}</strong>
                                </td>
                                <td>${value.price} x {value.noOfProucts} = {value.noOfProucts *value.price} </td>
                              </tr>
                            </>
                          )
                        })}
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Cart Subtotal</strong>
                          </td>
                          <td className="text-black">${isNaN(totalprice) ? "N/A" : totalprice.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <NavLink
                          className="d-block"
                          data-toggle="collapse"
                          to={'/succes'}
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsebank"
                        >
                          Cash On Delivery
                        </NavLink>
                      </h3>
                      <div className="collapse" id="collapsebank">
                        <div className="py-2">
                          <p className="mb-0">
                            Make your payment directly into our bank account. Please
                            use your Order ID as the payment reference. Your order
                            won’t be shipped until the funds have cleared in our
                            account.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border p-3 mb-5">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          data-toggle="collapse"
                          href="#collapsepaypal"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsepaypal"
                        >
                          Paypal
                        </a>
                      </h3>
                      <div className="collapse" id="collapsepaypal">
                        <div className="py-2">
                          <p className="mb-0">
                            Make your payment directly into our bank account. Please
                            use your Order ID as the payment reference. Your order
                            won’t be shipped until the funds have cleared in our
                            account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>

    </MainLayOutes>
  )
}

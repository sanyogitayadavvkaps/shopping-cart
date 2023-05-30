import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { postRequest } from '../../Api'
import { CategoryContext } from '../../App'
import MainLayOutes from '../../layoute/MainLayOutes'

export default function CheckOutForm() {
  const history  = useNavigate()
  const { handleSubmit, register,setValue } = useForm()
  const cart = useContext(CategoryContext)
  const { cartData } = cart
  const [selectData, setSelectData] = useState('')
  const countryData = ["Afghanistan", "India", "Algeria", "bangladesh", "Ghana", "Albania", "Bahrain", "Colombia", "Dominican Republic"]

  // const handleSelectChange = (event) => {
  //   alert(event)
  //   const selectedValue = event.target.value;
  //   setSelectData(selectedValue);
  //   setValue('country', selectedValue);
  //   // Register the selected value with react-hook-form
  // };
  const calculateSubtotal = () => {
    if (cartData.length === 0) {
      return 0;
    }

    return cartData.reduce((subtotal, product) => {
      return subtotal + (product.price * product.noOfProucts);
    }, 0);
  }

  const addData = async (value) => {
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
    const res= await postRequest('/check-out', {
      cartData: cartData, // Pass the cartData array
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
    if(res.status === 200) {
        
    }
  }
  return (
    <MainLayOutes>
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="border p-4 rounded" role="alert">
                Returning customer? <a href="#">Click here</a> to login
              </div>
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
                      onChange={(event)=>setSelectData(event.target.value)}
                      {...register('country')}
                    >
                      <option value="">Select a country</option>
                      {countryData.map((d, i) => (
                        <option value={d} key={i}>
                          {d}
                        </option>
                      ))}
                    </select>
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
                  </div>
                  <button type='submit'>ADD</button>
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
                        {cartData.length && cartData.map((value, i) => {
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
                          <td className="text-black">${calculateSubtotal()}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          data-toggle="collapse"
                          href="#collapsebank"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsebank"
                        >
                          Direct Bank Transfer
                        </a>
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
                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          data-toggle="collapse"
                          href="#collapsecheque"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsecheque"
                        >
                          Cheque Payment
                        </a>
                      </h3>
                      <div className="collapse" id="collapsecheque">
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
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-lg py-3 btn-block"
                        onClick={()=>history('/succes')}
                      >
                        Place Order
                      </button>
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

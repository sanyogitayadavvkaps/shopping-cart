import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteRequest, getRequestById, ServerUrl } from '../../Api';
import { CategoryContext } from '../../App';
import MainLayOutes from '../../layoute/MainLayOutes';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


export default function AddToCart() {

   const history = useNavigate();
  useEffect(() => {
    getAllCartByUserId()
    if (!localStorage.getItem("user_token")) {
      history("/login");
    }
  }, []);
  const cart = useContext(CategoryContext)
  const { allGetCart, getAllCartByUserId, quantity, setQuantity  } = cart



  const removeData = async (e, id) => {
    e.preventDefault();  
    const res = await deleteRequest(`/remove-cart/${id}`)
    console.log("RE+>",res);
    if(res.status===200)
    {
      toast.success("Cart deleted successfully");
      // getallGetCart()
     }
     else {
      toast.error("Error Please check..");
    }
  
  
  }

  const calculateSubtotal = () => {
    if (allGetCart?.length === 0) {
      return 0;
    }

    return allGetCart.reduce((subtotal, product) => {
      return subtotal + (product?.price * product?.noOfProucts);
    }, 0);
  };

  const calculateTotalPrice = () => {
    if (!allGetCart || allGetCart.length === 0) {
      return 0;
    }
  
    return allGetCart.reduce((total, product) => {
      return total + product?.price;
    }, 0);
  }


  return (
    <MainLayOutes>

      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <NavLink to={'/'}>Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Cart</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12">
              <div className="site-blocks-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  {allGetCart?.length && allGetCart?.map((productId, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td className="product-thumbnail">
                            <img
                              src={`${ServerUrl}/ProductImg/${productId.productImage}`}
                              alt="Image"
                              className="img-fluid"
                            />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">{productId.productName}</h2>
                          </td>
                          <td>₹{productId.price}</td>
                          <td>
                            <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-primary js-btn-minus"
                                  type="button"
                                  onClick={()=>setQuantity(quantity-1)}

                                >
                                  −
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control text-center"
                                value={productId.noOfProucts}
                                placeholder=""
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-primary js-btn-plus"
                                  type="button"
                                  onClick={()=>setQuantity(quantity+1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>₹{productId.price * productId.noOfProucts}</td>
                          <td>
                            <button onClick={(e) => removeData(e ,productId._id)} className="btn btn-primary btn-sm">
                              delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}

                </table>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <button className="btn btn-primary btn-sm btn-block">
                    Update Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <NavLink className="btn btn-outline-primary btn-sm btn-block" to={'/'}>
                    Continue Shopping
                  </NavLink>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary btn-sm">Apply Coupon</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Total Price</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">₹{calculateTotalPrice()}</strong>
                    </div>
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">₹{calculateSubtotal()}</strong>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <NavLink to={'/check-out-form'}
                        className="btn btn-primary btn-lg py-3 btn-block"
                        onclick=""
                      >
                        Proceed To Checkout
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </MainLayOutes>
  )
}

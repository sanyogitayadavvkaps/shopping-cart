import React, {  useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getRequestById, postRequest, putRequest, ServerUrl } from '../../Api'
import { CategoryContext } from '../../App'
import MainLayOutes from '../../layoute/MainLayOutes'
import Featured from '../Pages/Featured '



export default function ProductDetails() {
  const history = useNavigate()
  const cart = useContext(CategoryContext)
  const { quantity, setQuantity } = cart
  const [productId, setProductId] = useState([])
  const [product, setProduct] = useState({})
  
  const { id } = useParams()
  const user_id = localStorage.getItem('user_id')
 

  useEffect(() => {
    getProductId()
  }, [id])
  
  const getProductId = async () => {
    const res = await getRequestById(`/get-product-by-id/${id}`)
    setProductId(res.data)
    setProduct(res.data)
  }
  const addToCart = async () => {
    const value = productId.price * quantity
    //update-product
    await postRequest('/insert-cart', {
      productId: id,
      totalPrice: value,
      quantity: quantity,
      userId:user_id
    })
    await putRequest(`/update-product/${id}`,{noOfProucts:quantity})
    history('/add-to-cart')
}


console.log("product=>",product);
  return (
      <MainLayOutes>
          <div className="bg-light py-3">
  <div className="container">
    <div className="row">
      <div className="col-md-12 mb-0">
        <NavLink to={"/"}>Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">{productId.productName }</strong>
      </div>
    </div>
  </div>
</div>
<div className="site-section">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <img  src={`${ServerUrl}/ProductImg/${productId.productImage}`} alt="Image" className="img-fluid" />
      </div>
      <div className="col-md-6">
        <h2 className="text-black">{productId.productName }</h2>
        <p>
         {productId.description}
      </p>

        <p>
          <strong className="text-primary h4">${productId.price }</strong>
        </p>
        <div className="mb-1 d-flex">
          <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
            <span
              className="d-inline-block mr-2"
              style={{ top: "-2px", position: "relative" }}
            >
              <input type="radio" id="option-sm" name="shop-sizes" />
            </span>{" "}
            <span className="d-inline-block text-black">Small</span>
          </label>
          <label htmlFor="option-md" className="d-flex mr-3 mb-3">
            <span
              className="d-inline-block mr-2"
              style={{ top: "-2px", position: "relative" }}
            >
              <input type="radio" id="option-md" name="shop-sizes" />
            </span>{" "}
            <span className="d-inline-block text-black">Medium</span>
          </label>
          <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
            <span
              className="d-inline-block mr-2"
              style={{ top: "-2px", position: "relative" }}
            >
              <input type="radio" id="option-lg" name="shop-sizes" />
            </span>{" "}
            <span className="d-inline-block text-black">Large</span>
          </label>
          <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
            <span
              className="d-inline-block mr-2"
              style={{ top: "-2px", position: "relative" }}
            >
              <input type="radio" id="option-xl" name="shop-sizes" />
            </span>{" "}
            <span className="d-inline-block text-black"> Extra Large</span>
          </label>
        </div>
        <div className="mb-5">
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
            value={quantity}
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
        </div>
        <p>
                <NavLink
                  to="/add-to-cart" 
                  className="buy-now btn btn-sm btn-primary"
                  onClick={addToCart}
                 
                  // onClick={() => {
                  //   console.log("HEIE=>",productId)
                  //     let item = {
                  //       ...product,
                  //       id: product?._id,
                  //     };
                  //   console.log("ID=>",item);
                  //   addItem(item);
                    
                  //   return
                  // }
                  // }
                  >
                    Add To Cart
                  
          </NavLink>
         
        </p>
      </div>
    </div>
  </div>
          </div>
          <Featured/>

  </MainLayOutes>
  )
}

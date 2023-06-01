import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getRequestById, ServerUrl } from "../../Api";
import { CategoryContext } from "../../App";
import MainLayOutes from "../../layoute/MainLayOutes";

const FindProductByCategory = () => {
  const {id} = useParams()
  const[productData,setProductData] = useState([])
  const {categoryData} = useContext(CategoryContext);
  
  useEffect(() => {
    getProduct()
  
  }, [id])
  const getProduct = async () => {
    const res = await getRequestById(`/get-all-product-by-category/${id}`)
    setProductData(res.data.productId)
    console.log("RESPONSE+>",res.data);
  }
    
    return (
        <MainLayOutes>
        <div className="bg-light py-3">
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-0">
          <NavLink to={"/"}>Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
          <strong className="text-black">Shop</strong>
        </div>
      </div>
    </div>
  </div>
  
              <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-9 order-2">
            <div className="row">
              <div className="col-md-12 mb-5">
                <div className="float-md-left mb-4">
                  <h2 className="text-black h5">Shop All</h2>
                </div>
                <div className="d-flex">
                  <div className="dropdown mr-1 ml-md-auto">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      id="dropdownMenuOffset"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Latest
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuOffset"
                      x-placement="bottom-start"
                      style={{
                        position: "absolute",
                        willChange: "transform",
                        top: 0,
                        left: 0,
                        transform: "translate3d(0px, 43px, 0px)"
                      }}
                        >
                          {categoryData.length && categoryData.map((d, i) => {
                            return (
                              <NavLink className="dropdown-item" to={`/get-productid/${d._id}`} key={i}>
                              {d.categoryName}
                            </NavLink>
                          )}) }
                       
                    
                    
                    </div>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      id="dropdownMenuReference"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Reference
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuReference"
                      x-placement="bottom-start"
                      style={{
                        position: "absolute",
                        willChange: "transform",
                        top: 0,
                        left: 0,
                        transform: "translate3d(0px, 43px, 0px)"
                      }}
                    >
                      <a className="dropdown-item" href="#">
                        Relevance
                      </a>
                      <a className="dropdown-item" href="#">
                        Name, A to Z
                      </a>
                      <a className="dropdown-item" href="#">
                        Name, Z to A
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#">
                        Price, low to high
                      </a>
                      <a className="dropdown-item" href="#">
                        Price, high to low
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                <div className="row mb-5">
                  {productData.length && productData.map((data, index) => {
                    return (
                      <div
                      className="col-sm-6 col-lg-4 mb-4 aos-init aos-animate"
                        data-aos="fade-up"
                        key={index}
                    >
                      <div className="block-4 text-center border">
                        <figure className="block-4-image">
                          <NavLink to={`/prouct/detail/${data._id}`}>
                            <img
                              src={`${ServerUrl}/ProductImg/${data.productImage}`}
                              alt="Image placeholder"
                              className="img-fluid"
                            />
                          </NavLink>
                        </figure>
                        <div className="block-4-text p-4">
                          <h3>
                              <NavLink to={`/prouct/detail/${data._id}`}>{data.productName }</NavLink>
                          </h3>
                          <p className="mb-0"> {data.description?.split(" ", 4).join(" ")}</p>
                            <p className="text-primary font-weight-bold">{ data.price}</p>
                        </div>
                      </div>
                    </div>
                    )
                  }  
                  )}        
            </div>

          </div>
          <div className="col-md-3 order-1 mb-5 mb-md-0">
            <div className="border p-4 rounded mb-4">
              <h3 className="mb-3 h6 text-uppercase text-black d-block">
                Categories
                  </h3>
                  {categoryData.length && categoryData.map((d, i) => {
                    return (
                  <ul className="list-unstyled mb-0" key={i}>
                    
                    <li className="mb-1">
                    <NavLink  to={`/get-productid/${d._id}`} className="d-flex">
                  <span>{d.categoryName }</span>{" "}
                  <span className="text-black ml-auto">({d.productId.length})</span>
                </NavLink>
                </li>
              
                    </ul>
                    )})}
            </div>
            <div className="border p-4 rounded mb-4">
              <div className="mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                  Filter by Price
                </h3>
                <div
                  id="slider-range"
                  className="border-primary ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                >
                  <div
                    className="ui-slider-range ui-corner-all ui-widget-header"
                    style={{ left: "15%", width: "45%" }}
                  />
                  <span
                    tabIndex={0}
                    className="ui-slider-handle ui-corner-all ui-state-default"
                    style={{ left: "15%" }}
                  />
                  <span
                    tabIndex={0}
                    className="ui-slider-handle ui-corner-all ui-state-default"
                    style={{ left: "60%" }}
                  />
                </div>
                <input
                  type="text"
                  name="text"
                  id="amount"
                  className="form-control border-0 pl-0 bg-white"
                  disabled=""
                />
              </div>
              <div className="mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">Size</h3>
                <label htmlFor="s_sm" className="d-flex">
                  <input type="checkbox" id="s_sm" className="mr-2 mt-1" />{" "}
                  <span className="text-black">Small (2,319)</span>
                </label>
                <label htmlFor="s_md" className="d-flex">
                  <input type="checkbox" id="s_md" className="mr-2 mt-1" />{" "}
                  <span className="text-black">Medium (1,282)</span>
                </label>
                <label htmlFor="s_lg" className="d-flex">
                  <input type="checkbox" id="s_lg" className="mr-2 mt-1" />{" "}
                  <span className="text-black">Large (1,392)</span>
                </label>
              </div>
              <div className="mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">Color</h3>
                <a href="#" className="d-flex color-item align-items-center">
                  <span className="bg-danger color d-inline-block rounded-circle mr-2" />{" "}
                  <span className="text-black">Red (2,429)</span>
                </a>
                <a href="#" className="d-flex color-item align-items-center">
                  <span className="bg-success color d-inline-block rounded-circle mr-2" />{" "}
                  <span className="text-black">Green (2,298)</span>
                </a>
                <a href="#" className="d-flex color-item align-items-center">
                  <span className="bg-info color d-inline-block rounded-circle mr-2" />{" "}
                  <span className="text-black">Blue (1,075)</span>
                </a>
                <a href="#" className="d-flex color-item align-items-center">
                  <span className="bg-primary color d-inline-block rounded-circle mr-2" />{" "}
                  <span className="text-black">Purple (1,075)</span>
                </a>
              </div>
            </div>
          </div>
                </div>
       
     
      </div>
    </div>
    </MainLayOutes>
    )
}

export default FindProductByCategory
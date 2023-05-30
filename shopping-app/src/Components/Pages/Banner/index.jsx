import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Banner() {
  return (
    <div
    className="site-blocks-cover aos-init aos-animate"
    style={{ backgroundImage: "url(./images/hero_1.jpg)" }}
    data-aos="fade"
  >
    <div className="container">
      <div className="row align-items-start align-items-md-center justify-content-end">
        <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
          <h1 className="mb-2">Finding Your Perfect Shoes</h1>
          <div className="intro-text text-center text-md-left">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              at iaculis quam. Integer accumsan tincidunt fringilla.{" "}
            </p>
            <p>
              <NavLink to={'/shop'} className="btn btn-sm btn-primary">
                Shop Now
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

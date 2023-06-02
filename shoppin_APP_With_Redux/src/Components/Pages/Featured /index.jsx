/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

export default function Featured() {
  return (
    <div className="site-section block-3 site-blocks-2 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 site-section-heading text-center pt-4">
          <h2>Featured Products</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="nonloop-block-3 owl-carousel owl-loaded owl-drag">
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: 1864,
                  paddingLeft: 15,
                  paddingRight: 15
                }}
              >
                <div
                  className="owl-item active"
                  style={{ width: "346.667px", marginRight: 20 }}
                >
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img
                          src="/images/cloth_1.jpg"
                          alt="Image placeholder"
                          className="img-fluid"
                        />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3>
                          <a href="#">Tank Top</a>
                        </h3>
                        <p className="mb-0">Finding perfect t-shirt</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "346.667px", marginRight: 20 }}
                >
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img
                          src="/images/shoe_1.jpg"
                          alt="Image placeholder"
                          className="img-fluid"
                        />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3>
                          <a href="#">Corater</a>
                        </h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item active"
                  style={{ width: "346.667px", marginRight: 20 }}
                >
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img
                          src="/images/cloth_2.jpg"
                          alt="Image placeholder"
                          className="img-fluid"
                        />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3>
                          <a href="#">Polo Shirt</a>
                        </h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "346.667px", marginRight: 20 }}
                >
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        {/* // eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                          src="/images/cloth_3.jpg"
                          alt="Image placeholder"
                          className="img-fluid"
                        />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3>
                          <a href="#">T-Shirt Mockup</a>
                        </h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item"
                  style={{ width: "346.667px", marginRight: 20 }}
                >
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img
                          src="/images/shoe_1.jpg"
                          alt="Image placeholder"
                          className="img-fluid"
                        />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3>
                          <a href="#">Corater</a>
                        </h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav">
              <div className="owl-prev disabled">
                <span className="icon-arrow_back" />
              </div>
              <div className="owl-next">
                <span className="icon-arrow_forward" />
              </div>
            </div>
            <div className="owl-dots">
              <div className="owl-dot active">
                <span />
              </div>
              <div className="owl-dot">
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

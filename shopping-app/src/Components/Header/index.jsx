import { Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart';
import { CategoryContext } from '../../App'
import { AiOutlineLogin } from 'react-icons/ai'
export default function Header() {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, cartTotal, removeItem } =
    useCart();
  let user = localStorage.getItem('response')
  user = JSON.parse(user)

  // const id = localStorage.getItem("_id")
  const history = useNavigate()
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    // remove the token from local storage and update the state
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("response");

    setToken(null);
  };

  // check if token exists in local storage
  const storedToken = localStorage.getItem("token");
  if (storedToken && !token) {
    // set the token from local storage
    setToken(storedToken);
  }

  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
              <form action="" className="site-block-top-search">
                <span className="icon icon-search2" />
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search"
                />
              </form>
            </div>
            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
              <div className="site-logo">
                <a href="index.html" className="js-logo-clone">
                  Shoppers
                </a>
              </div>
            </div>
            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="site-top-icons">
                <ul>
                  <i className="fas fa-sign-in" />

                  <li>
                    <a href="#">
                      <span className="icon icon-person" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon icon-heart-o" />
                    </a>
                  </li>
                  <li>
                    <NavLink to={'/add-to-cart'} className="site-cart">
                      <span className="icon icon-shopping_cart" />
                      <span className="count">{items.length}</span>
                    </NavLink>
                  </li>
                  {/* <li className="d-inline-block ml-md-0">
                    <a href="#" className="site-menu-toggle js-menu-toggle">
                      <span className="icon-menu" />
                    </a>
                  </li> */}

                {token ? (

                  <li className="d-inline-block ml-md-0">
                    <Button className="text-reset me-3" onClick={handleLogout}
                         style={{
                           marginRight: "4px",
                           marginLeft:"8px",
                          backgroundColor: '#8f8f9f',
                          color: 'white',
                          transition: 'background-color 0.3s ease',
                          ':hover': {
                            backgroundColor: 'red',
                          }
                        }}
                    >
                      Logout
                    </Button>

                  </li>
                  ) : (
                  <li className="d-inline-block ml-md-0 ">

                    <Button
                      className="text-reset me-3"
                      onClick={() => history('/login')}
                      style={{
                        marginRight:"4px",
                        backgroundColor: '#42876a',
                        color: 'white',
                        transition: 'background-color 0.3s ease',
                        ':hover': {
                          backgroundColor: 'red',
                        }
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="text-reset me-3"
                      onClick={() => history('/sign-up')}
                      style={{
                        backgroundColor: '#467fe7',
                        color: 'white',
                        transition: 'background-color 0.3s ease',
                        ':hover': {
                          backgroundColor: 'yellow',
                        }
                      }}
                    >
                      Sign Up
                    </Button>

                  </li>
                   )} 

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="site-navigation text-right text-md-center" role="navigation">
        <div className="container">
          <ul className="site-menu js-clone-nav d-none d-md-block">
            <li className="has-children active">
              <NavLink to={"/"}>Home</NavLink>
              <ul className="dropdown">
                <li>
                  <a href="#">Menu One</a>
                </li>
                <li>
                  <a href="#">Menu Two</a>
                </li>
                <li>
                  <a href="#">Menu Three</a>
                </li>
                <li className="has-children">
                  <a href="#">Sub Menu</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Menu One</a>
                    </li>
                    <li>
                      <a href="#">Menu Two</a>
                    </li>
                    <li>
                      <a href="#">Menu Three</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="has-children">
              <a href="about.html">About</a>
              <ul className="dropdown">
                <li>
                  <a href="#">Menu One</a>
                </li>
                <li>
                  <a href="#">Menu Two</a>
                </li>
                <li>
                  <a href="#">Menu Three</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to={'/shop'}>Shop</NavLink>
            </li>
            <li>
              <a href="#">Catalogue</a>
            </li>
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

  )
}

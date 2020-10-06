import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar2 = ({ cart }) => {
  const [flag, setflag] = useState(true);
  return (
    <div className="header-bottom  header-sticky">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-1 col-lg-1 col-md-1 col-sm-3">
            <div className="logo">
              <a href="#Top">
                {/* <img src="assets/img/logo/logo.png" alt="" /> */}
                <h3>K.Khaddar</h3>
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-8 col-md-7 col-sm-5">
            <div className="main-menu f-right d-none d-lg-block">
              <nav>
                <ul id="navigation">
                  <li>
                    {/* <a href="#Home">Home</a> */}
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    {/* <a href="#Catagori">Catagori</a> */}
                    <Link to="/Categories">Categories</Link>
                  </li>
                  <li className="hot">
                    <Link to="/">Products</Link>
                    {/* Products */}
                    <ul className="submenu">
                      <li>
                        {/* <Link to="/Latest">Latest</Link> */}
                        <Link to="/Productslist"> Product list</Link>
                      </li>
                      <li>
                        <Link to="/latestproducts">Latest</Link>
                        {/* <a href="product_list.html"> Product list</a> */}
                      </li>
                      <li>
                        {/* <a href="single-product.html"> Product Details</a> */}
                      </li>
                    </ul>
                  </li>
                  {/* <li>
                    <Link to="/Blog">Blog</Link>
                  </li> */}

                  <li>
                    <Link to="/Contact">About Us</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-xl-5 col-lg-3 col-md-3 col-sm-3 fix-card">
            <ul className="header-right f-right d-none d-lg-block d-flex justify-content-between">
              <li className=" d-none d-xl-block">
                <div className="favorit-items">
                  <span className="items__">
                    {cart.wishlist && cart.wishlist.length}
                  </span>
                  <Link to="wishlist">
                    <i className="far fa-heart"></i>
                  </Link>
                </div>
              </li>
              <li>
                <div className="shopping-card">
                  <Link to="/Cart">
                    <span className="items__">
                      {cart.cartitems && cart.cartitems.length}
                    </span>
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <div className="mobile_menu d-block d-lg-none">
              <div class="slicknav_menu">
                <a
                  aria-haspopup="true"
                  role="button"
                  tabindex="0"
                  class="slicknav_btn slicknav_collapsed"
                  onClick={() => setflag(!flag)}
                >
                  <span class="slicknav_menutxt">MENU</span>
                  <span class="slicknav_icon">
                    <span class="slicknav_icon-bar"></span>
                    <span class="slicknav_icon-bar"></span>
                    <span class="slicknav_icon-bar"></span>
                  </span>
                </a>
                {!flag && (
                  <ul
                    class="slicknav_nav slicknav_hidden"
                    aria-hidden="true"
                    role="menu"
                    style={{ outline: 'none' }}
                  >
                    <li>
                      <Link to="/" onClick={() => setflag(!flag)}>
                        Home
                      </Link>
                      {/* <a href="#" role="menuitem" tabindex="-1">
                        Home
                      </a> */}
                    </li>
                    <li>
                      <Link to="/Categories" onClick={() => setflag(!flag)}>
                        Categories
                      </Link>
                    </li>
                    <li class="hot slicknav_collapsed slicknav_parent">
                      <a
                        href="#"
                        role="menuitem"
                        aria-haspopup="true"
                        tabindex="-1"
                        class="slicknav_item slicknav_row"
                        style={{ outline: 'none' }}
                      >
                        <Link to="/Productslist" onClick={() => setflag(!flag)}>
                          {' '}
                          Product list
                        </Link>
                      </a>
                    </li>
                    <li class="slicknav_collapsed slicknav_parent">
                      <a
                        href="#"
                        role="menuitem"
                        aria-haspopup="true"
                        tabindex="-1"
                        class="slicknav_item slicknav_row"
                        style={{ outline: 'none' }}
                      >
                        <Link to="/Blog" onClick={() => setflag(!flag)}>
                          Blog
                        </Link>
                      </a>
                    </li>
                    <li>
                      <Link to="/Contact" onClick={() => setflag(!flag)}>
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link to="wishlist" onClick={() => setflag(!flag)}>
                        Wish List
                      </Link>
                    </li>
                    <li>
                      <Link to="checkout" onClick={() => setflag(!flag)}>
                        Checkout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Navbar2);

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header-top top-bg d-none d-lg-block">
      <div className="container-fluid">
        <div className="col-xl-12">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="header-info-left d-flex">
              <div className="flag">
                <img src="assets/img/icon/pak.png" alt="" />
              </div>
              {/* <div className="select-this">
                <form action="#">
                  <div className="select-itms">
                    <select name="select" id="select1">
                      <option value="">PAKISTAN</option>
                    </select>
                  </div>
                </form>
              </div> */}
              <ul className="contact-now">
                <li>+923137800039</li>
              </ul>
            </div>
            <div className="header-info-right">
              <ul>
                <li>
                  <Link to="/wishlist">Wish List</Link>
                  {/* <a href="product_list.html">Wish List </a> */}
                </li>
                <li>
                  <Link to="/Categories">Shopping</Link>
                  {/* <a href="cart.html">Shopping</a> */}
                </li>
                <li>
                  <Link to="/Cart">Cart</Link>
                  {/* <a href="cart.html">Cart</a> */}
                </li>
                <li>
                  <Link to="/Checkout">Checkout</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

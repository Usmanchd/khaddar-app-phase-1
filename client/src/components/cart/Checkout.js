import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderPlace } from '../../actions/cart';

const Checkout = ({ cart, orderPlace }) => {
  const [total, setTotal] = useState(0);
  const [orderdetail, setOrderdetail] = useState({
    firstname: '',
    secondname: '',
    phonenumber: '',
    email: '',
    phoneother: '',
    city: '',
    permanentAddress: '',
    postalAddress: '',
    postcodeZip: '',
    othernotes: '',
  });
  const {
    firstname,
    secondname,
    phonenumber,
    email,
    phoneother,
    city,
    permanentAddress,
    postalAddress,
    postcodeZip,
    othernotes,
  } = orderdetail;
  let shipping = 150;
  useEffect(() => {
    setTotal(
      cart.cartitems.reduce((amount, c) => (amount += c.quantity * c.price), 0)
    );
  }, [cart.cartitems]);

  const onChange = (e) =>
    setOrderdetail({ ...orderdetail, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const productsOrder = cart.cartitems.map((item) => {
      return { product: item._id, quantity: item.quantity };
    });
    orderPlace({ ...orderdetail, total, orders: productsOrder });
    console.log({ ...orderdetail, total, orders: productsOrder });
  };
  return (
    <div>
      {/* <div class="slider-area ">
        <div
          class="single-slider slider-height2 d-flex align-items-center"
          style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
        >
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="hero-cap text-center">
                  <h2>Checkout</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <section class="checkout_area ">
        <div class="container">
          <div class="billing_details">
            <div class="row">
              <div class="col-lg-8">
                <h3>Billing Details</h3>
                <form
                  class="row contact_form"
                  onSubmit={(e) => onSubmit(e)}
                  novalidate="novalidate"
                >
                  <div class="col-md-6 form-group p_star">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=" First name"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group p_star">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Second Name"
                      name="secondname"
                      value={secondname}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div class="col-md-6 form-group p_star">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Phone Number"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="col-md-6 form-group p_star">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="col-md-6 form-group p_star">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Phone Number(other)"
                      name="phoneother"
                      value={phoneother}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div class="col-md-12 form-group p_star">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Permanent Address"
                      name="permanentAddress"
                      value={permanentAddress}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="col-md-12 form-group p_star">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Postal Address"
                      name="postalAddress"
                      value={postalAddress}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="col-md-12 form-group p_star">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Town/City"
                      name="city"
                      value={city}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="col-md-12 form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="zip"
                      name="postcodeZip"
                      placeholder="Postcode/ZIP"
                      value={postcodeZip}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="col-md-12 form-group">
                    <textarea
                      class="form-control"
                      name="othernotes"
                      id="message"
                      rows="1"
                      placeholder="Order Notes"
                      value={othernotes}
                      onChange={(e) => onChange(e)}
                    ></textarea>
                  </div>
                  <div>
                    <input type="submit" value="Order Now" className="btn" />
                  </div>
                </form>
              </div>
              <div class="col-lg-4">
                <div class="order_box">
                  <h2>Your Order</h2>
                  <ul class="list">
                    <li>
                      <a href="#">
                        Product
                        <span>Total</span>
                      </a>
                    </li>
                    {cart.cartitems && cart.cartitems.length >= 1 ? (
                      cart.cartitems.map((item) => (
                        <li>
                          <a href="#">
                            {item.name}
                            <span class="middle">x 0{item.quantity}</span>
                            <span class="last">
                              <b>{item.price * item.quantity}</b>
                            </span>
                          </a>
                        </li>
                      ))
                    ) : (
                      <h3>There's no product in cart</h3>
                    )}
                  </ul>

                  <ul class="list list_2">
                    <li>
                      <a href="#">
                        Subtotal
                        <span>{total}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Shipping
                        <span>Flat rate: {shipping}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Total
                        <span>
                          <b>{total + shipping}</b>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <tr className="bottom_button">
                  <td>
                    <a className="btn_1" href="#">
                      <Link to="/Productslist">Continue Shopping</Link>
                    </a>
                  </td>
                </tr>
              </div>
              <tr className="bottom_button">
                <td>
                  {/* <a className="btn_1" href="#">
                    <Link to="">Order Now</Link>
                  </a> */}
                </td>
              </tr>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { orderPlace })(Checkout);

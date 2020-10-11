import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderPlace } from '../../actions/cart';

const Checkout = ({ cart, orderPlace }) => {
  const [total, setTotal] = useState(0);
  const [orderdetail, setOrderdetail] = useState({
    firstname: '',
    secondname: '',
    phonenumber: +92,
    email: '',
    phoneother: +92,
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
    setOrderdetail({
      firstname: '',
      secondname: '',
      phonenumber: +92,
      email: '',
      phoneother: +92,
      city: '',
      permanentAddress: '',
      postalAddress: '',
      postcodeZip: '',
      othernotes: '',
    });
  };
  return (
    <div>
      {/* <div className="slider-area ">
        <div
          className="single-slider slider-height2 d-flex align-items-center"
          style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Checkout</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <section className="checkout_area ">
        <div className="container">
          <div className="billing_details">
            <div className="row">
              <div className="col-lg-8">
                <h3>Billing Details</h3>
                <form
                  className="row contact_form"
                  onSubmit={(e) => onSubmit(e)}
                  // novalidate="novalidate"
                >
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" First name"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Second Name"
                      name="secondname"
                      value={secondname}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group p_star">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={(e) => onChange(e)}
                      required
                      minLength="9"
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone Number(other)"
                      name="phoneother"
                      value={phoneother}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Permanent Address"
                      name="permanentAddress"
                      value={permanentAddress}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Postal Address"
                      name="postalAddress"
                      value={postalAddress}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Town/City"
                      name="city"
                      value={city}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="number"
                      className="form-control"
                      id="zip"
                      name="postcodeZip"
                      placeholder="Postcode/ZIP"
                      value={postcodeZip}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <textarea
                      className="form-control"
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
              <div className="col-lg-4">
                <div className="order_box">
                  <h2>Your Order</h2>
                  <ul className="list">
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
                            {item.name}({item.code})
                            <span className="middle">x 0{item.quantity}</span>
                            <span className="last">
                              <b>{item.price * item.quantity}</b>
                            </span>
                          </a>
                        </li>
                      ))
                    ) : (
                      <h3>There's no product in cart</h3>
                    )}
                  </ul>

                  <ul className="list list_2">
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

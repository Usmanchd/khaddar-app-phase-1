import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCart } from '../../actions/cart';
import { removeItem } from '../../actions/cart';

const Cart = ({ cart, updateCart, removeItem }) => {
  console.log(cart);
  useEffect(
    () => localStorage.setItem('cart', JSON.stringify(cart.cartitems)),
    [cart.cartitems]
  );
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.cartitems.reduce((amount, c) => (amount += c.quantity * c.price), 0)
    );
  }, [cart.cartitems]);
  // const [itemtotal, setItemTotal] = useState(0);
  // useEffect(() => {
  //   setTotal(
  //     cart.cartitems.reduce((amount, c) => (amount += c.quantity * c.price), 0)
  //   );
  // }, [cart.cartitems]);
  const handleDecrement = (item) => {
    if (item.quantity === 1) return;
    cart.cartitems.map((p) => {
      const addCart =
        p._id === item._id ? { ...item, quantity: --item.quantity } : item;
      updateCart(addCart);
    });
  };
  const handleIncrement = (item) =>
    cart.cartitems.map((p) => {
      const addCart =
        p._id === item._id ? { ...item, quantity: ++item.quantity } : item;
      updateCart(addCart);
    });
  const handleRemove = (item) => {
    removeItem(item._id);
  };
  return (
    <div className="slider-area ">
      {/* <div
        className="single-slider slider-height2 d-flex align-items-center"
        style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap text-center">
                <h2>Card List</h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section className="cart_area">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartitems &&
                    cart.cartitems.map((item) => (
                      <tr>
                        <td>
                          <div className="media">
                            <div className="d-flex">
                              <img src={item.img} alt="" width="50%" />
                            </div>
                            <div className="media-body">
                              <p>
                                <b>{item.decrip}</b>
                              </p>
                              <p>
                                {item.name}({item.code})
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5>{item.price}</h5>
                        </td>
                        <td>
                          <div className="product_count">
                            {/* <input
                              className="input-number"
                              type="text"
                              value="1"
                              min="0"
                              max="10"
                            /> */}
                            <span>
                              {' '}
                              <button
                                className="btn"
                                onClick={() => handleDecrement(item)}
                                disabled={item.quantity == 1}
                                style={{ padding: '16px', marginRight: '4px' }}
                              >
                                -
                              </button>
                            </span>
                            {item.quantity}
                            <span>
                              {' '}
                              <button
                                className="btn"
                                onClick={() => handleIncrement(item)}
                                style={{ padding: '16px' }}
                              >
                                +
                              </button>
                            </span>
                            <span>
                              {' '}
                              <button
                                className="btn"
                                onClick={() => handleRemove(item)}
                                style={{ padding: '16px' }}
                              >
                                Remove
                              </button>
                            </span>
                          </div>
                        </td>
                        <td>
                          <h4>
                            <b>{item.price * item.quantity}</b>
                          </h4>
                        </td>
                      </tr>
                    ))}

                  <tr className="bottom_button">
                    <td>
                      <a className="btn_1" href="#">
                        <Link to="/Productslist">Continue Shopping</Link>
                      </a>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      {/* <div className="cupon_text float-right">
                        <a className="btn_1" href="#">
                          Details
                        </a>
                      </div> */}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <h5>discount</h5>
                    </td>
                    <td>
                      <h5>$00.00</h5>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <h5>
                        <b>Subtotal</b>
                      </h5>
                    </td>
                    <td>
                      <h3>
                        <b>{total}</b>
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="checkout_btn_inner float-right">
                <Link to="/checkout">
                  <a className="btn_1 checkout_btn_1">CheckOut</a>
                </Link>
              </div>
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

export default connect(mapStateToProps, { updateCart, removeItem })(Cart);

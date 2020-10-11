import React, { useState } from 'react';
import axios from 'axios';

export default function OrderDetailsModal({
  order,
  socket,
  deleteOrder,
  closeModal,
}) {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState({ value: order.orderStatus });

  const handleChange = async (event) => {
    setloading(true);
    setstate({ value: event.target.value });
    await axios.put(`/api/orders/${order._id}`, {
      orderStatus: event.target.value,
    });
    socket.emit('new_order', 'order');
    setloading(false);
  };
  return (
    <div className="slider-area ">
      <div>
        <h3>Customer Details</h3>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: 20,
          }}
        >
          <p style={{ paddingRight: 14 }}>
            <b>Name : </b> {order.firstname} {order.secondname}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Email : </b> {order.email}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Phone Number : </b> {order.phonenumber}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Other Phone Number : </b> {order.phoneother}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>City : </b> {order.city}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Address : </b> {order.permanentAddress}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Postal Address : </b> {order.postalAddress}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Zip Code : </b> {order.postcodeZip}
          </p>
          <p style={{ paddingRight: 14 }}>
            <b>Notes : </b>
            {order.othernotes}
          </p>

          <br />

          {/* <td>{getFormattedDate(new Date(order.date))}</td> */}
        </span>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: 20,
          }}
        >
          <p>
            <b>Status : </b>
            {order.orderStatus}
            {loading && (
              <img
                src={require('../../../assets/loader1.svg')}
                alt=""
                width="10%"
              />
            )}

            <select
              name="categories"
              class="form-control"
              onChange={(e) => handleChange(e)}
              value={state.value}
              style={{ width: '140px' }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </p>
          <p>
            <button
              className="btn"
              style={{ padding: '18px' }}
              onClick={() => {
                deleteOrder(order._id);
                closeModal();
              }}
            >
              Remove Order
            </button>
          </p>
        </span>
      </div>
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
              <h3>Order Details</h3>
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
                  {order.orders.map((item) => (
                    <tr>
                      <td>
                        <div className="media">
                          <div className="d-flex">
                            <img src={item.product.img} alt="" width="50%" />
                          </div>
                          <div className="media-body">
                            <p>
                              <b>{item.product.decrip}</b>
                            </p>
                            <p>
                              {item.product.name}({item.product.code})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5>{item.product.price}</h5>
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
                          <span> </span>
                          {item.quantity}

                          <span> </span>
                        </div>
                      </td>
                      <td>
                        <h4>
                          <b>{item.product.price * item.quantity}</b>
                        </h4>
                      </td>
                    </tr>
                  ))}

                  <tr className="bottom_button">
                    <td>
                      {/* <a className="btn_1" href="#">
                        <Link to="/Productslist">Continue Shopping</Link>
                      </a> */}
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
                        <b>{order.total + 150}</b>
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

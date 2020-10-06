import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrderData, deleteOrder } from '../../actions/cart';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

const socket = socketIOClient(ENDPOINT);

const Orderlist = ({ cart, getOrderData, deleteOrder }) => {
  useEffect(() => {
    getOrderData();
    socket.on('new_order_placed', (order) => getOrderData());
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Booked Order</h1>
        <input type="text" placeholder="Search by customer name" />
      </div>
      <table className="table order-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone No</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
            <th scope="col">orderStatus</th>
            <th scope="col">delete</th>
          </tr>
        </thead>

        <tbody style={{}}>
          {cart.orderslist.map((c) => (
            <tr>
              <td>{c.firstname}</td>
              <td>{c.phonenumber}</td>
              <td>{c.city}</td>
              <td>{c.postalAddress}</td>

              <td>{c.orderStatus}</td>
              <td>
                <button
                  style={{
                    backgroundColor: 'black',
                    borderRadius: '20%',
                  }}
                  onClick={() => deleteOrder(c._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {console.log(cart.orderslist)}
    </div>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { getOrderData, deleteOrder })(
  Orderlist
);

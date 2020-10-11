import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOrderData, deleteOrder } from '../../actions/cart';
import axios from 'axios';
import Modal from 'react-modal';
import OrderDetailsModal from './layout/OrderDetailsModal';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

const socket = socketIOClient(ENDPOINT);

const customStyles = {
  content: {
    top: '100px',
    left: '330px',
    right: '130px',
    bottom: '30px',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
    zIndex: 99,
  },
};

Modal.setAppElement('#root');

const Orderlist = ({ cart, getOrderData, deleteOrder }) => {
  useEffect(() => {
    getOrderData();
    socket.on('new_order_placed', (order) => getOrderData());
  }, []);

  const [orderDetails, setorderDetails] = useState('');

  let selectedOrder =
    orderDetails && cart.orderslist.filter((c) => c._id === orderDetails)[0];

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const getFormattedDate = (current_datetime) =>
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();

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
            <th scope="col">Order Status</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
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
              <td>{getFormattedDate(new Date(c.date))}</td>
              {/* <td>
                <button
                  className="btn"
                  style={{ padding: '22px' }}
                  onClick={() => deleteOrder(c._id)}
                >
                  Remove
                </button>
              </td> */}
              <td>
                <button
                  className="btn"
                  style={{ padding: '19px', zIndex: 0 }}
                  onClick={() => {
                    setorderDetails(c._id);
                    openModal();
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Order Details"
      >
        <OrderDetailsModal
          order={selectedOrder}
          socket={socket}
          deleteOrder={deleteOrder}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { getOrderData, deleteOrder })(
  Orderlist
);

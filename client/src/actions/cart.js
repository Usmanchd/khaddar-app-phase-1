import uuid from 'uuid';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

const socket = socketIOClient(ENDPOINT);

export const addCart = (cart) => (dispatch) => {
  dispatch({
    type: 'ADD_CART',
    payload: cart,
  });
};
export const updateCart = (cart) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CART',
    payload: cart,
  });
};
export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_ITEM',
    payload: id,
  });
};

export const addLike = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_WISHLIST',
    payload: product,
  });
};
export const unLike = (product) => (dispatch) => {
  dispatch({
    type: 'REMOVE_WISHLIST',
    payload: product,
  });
};

// ADD orderPlace
export const orderPlace = (orderdata) => async (dispatch) => {
  const config = { 'Content-Type': 'application/json' };
  const res = await axios.post(`/api/orders`, orderdata, config);

  socket.emit('new_order', 'order');

  dispatch({
    type: 'PLACE_ORDER',
    // payload: res.data,
  });
};

export const deleteOrder = (id) => async (dispatch) => {
  const res = await axios.delete(`/api/orders/${id}`);

  socket.emit('new_order', 'order');

  dispatch({
    type: 'PLACE_ORDER',
    // payload: res.data,
  });
};

//GET ORDER DATA
export const getOrderData = () => async (dispatch) => {
  const orders = await axios.get('/api/orders');

  dispatch({
    type: 'GET_ORDER_DATA',
    payload: orders.data,
  });
};

import axios from "axios";

// ADD Category
export const addCategory = (formdata) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };
  const res = await axios.post(`/api/category/create`, formdata, config);

  dispatch({
    type: "ADD_CATEGORY",
    payload: res.data,
  });
  dispatch(getInitData());
};

// REMOVE Category
export const removeCategory = (id) => async (dispatch) => {
  const res = await axios.delete(`/api/category/${id}`);

  dispatch({
    type: "REMOVE_CATEGORY",
    payload: id,
  });
  dispatch(getInitData());
};
// UPDATE CATEGORY
export const updateCategory = (formdata) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };
  const res = await axios.put(`/api/category/${formdata.id}`, formdata, config);
  console.log();

  dispatch({
    type: "UPDATE_CAT",
    payload: res.data,
  });

  dispatch(getInitData());
};

// ADD ITEM
export const addItem = (formdata) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };
  const res = await axios.post(`/api/products/create`, formdata, config);

  dispatch({
    type: "ADD_ITEM",
    payload: res.data,
  });
  dispatch(getInitData());
};

// UPDATE ITEM
export const updateItem = (formdata) => async (dispatch) => {
  const config = { "Content-Type": "application/json" };
  const res = await axios.put(`/api/products/${formdata.id}`, formdata, config);

  dispatch({
    type: "UPDATE_ITEM",
    payload: res.data,
  });
  dispatch(getInitData());
};

// REMOVE Item
export const removeItem = (id) => async (dispatch) => {
  const res = await axios.delete(`/api/products/${id}`);

  dispatch({
    type: "REMOVE_ITEM",
    payload: id,
  });
  dispatch(getInitData());
};

// set current cat
export const setCurrentCat = (c) => async (dispatch) => {
  dispatch({
    type: "SET_CURRENT_CAT",
    payload: c,
  });
};

// cleare current cat
export const clearCurrentCat = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_CURRENT_CAT",
  });
};

// set current item
export const setCurrentItem = (c) => async (dispatch) => {
  dispatch({
    type: "SET_CURRENT_ITEM",
    payload: c,
  });
};
// clear current item
export const clearCurrentItem = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_CURRENT_ITEM",
  });
};

export const getInitData = () => async (dispatch) => {
  const products = await axios.get("/api/products");
  const category = await axios.get("/api/category");

  dispatch({
    type: "SET_PRODUCTS",
    payload: products.data,
  });

  dispatch({
    type: "SET_CATEGORY",
    payload: category.data,
  });
};

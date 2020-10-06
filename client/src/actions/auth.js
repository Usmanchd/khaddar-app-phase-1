import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

// Register User
export const register = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);
  try {
    const res = await axios.post("/api/user", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: "LOGIN_FAIL", payload: err.message });
  }
};

// Login User
export const login = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);
  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.msg, "lksfjd");
    dispatch({ type: "LOGIN_FAIL", payload: err.message });
  }
};
// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

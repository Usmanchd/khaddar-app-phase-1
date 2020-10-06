const getuser = () => {
  const LS = localStorage.getItem("user");
  return LS ? LS : null;
};
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: getuser(),
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGIN_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

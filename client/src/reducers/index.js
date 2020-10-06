import { combineReducers } from "redux";
import addnewitem from "./addnewitem";
import cart from "./cart";
import auth from "./auth";

export default combineReducers({
  addnewitem,
  cart,
  auth,
});

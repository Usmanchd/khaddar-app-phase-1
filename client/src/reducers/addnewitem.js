import uuid from "uuid";
import InitialState from "./InitialState";
import axios from "axios";

const inititialize = {
  items: [],
  categories: [],
  currentcat: null,
  currentitem: null,
};

const Reducer = (state = inititialize, action) => {
  let { type, payload } = action;
  switch (type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [payload, ...state.items],
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [payload, ...state.categories],
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((cat) => cat._id !== payload),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((cat) => cat._id !== payload),
      };

    case "SET_CURRENT_CAT":
      return {
        ...state,
        currentcat: payload,
      };
    case "SET_CURRENT_ITEM":
      return {
        ...state,
        currentitem: payload,
      };
    case "CLEAR_CURRENT_CAT":
      return {
        ...state,
        currentcat: null,
      };
    case "CLEAR_CURRENT_ITEM":
      return {
        ...state,
        currentitem: null,
      };
    case "UPDATE_CAT":
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat._id === payload.id ? payload : cat
        ),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === payload.id ? payload : item
        ),
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        items: [...payload],
      };

    case "SET_CATEGORY":
      return {
        ...state,
        categories: [...payload],
      };
    // case "UPDATE":
    //   return {
    //     ...state,
    //     contacts: [
    //       ...state.contacts.map(contact =>
    //         contact._id === action.contact._id ? action.contact : contact
    //       )
    //     ],
    //     loading: false
    //   };
    // case "DELETE":
    //   return {
    //     ...state,
    //     contacts: state.contacts.filter(
    //       contact => contact._id !== action.payload
    //     ),
    //     loading: false
    //   };
    // case "SET_CURRENT_CONTACT":
    //   return { ...state, current: action.contact };
    // case "CLEAR_CURRENT_CONTACT":
    //   return { ...state, current: null };
    // case "FILTERCONTACTS":
    //   return {
    //     ...state,
    //     filtered: state.contacts.filter(contact => {
    //       const regex = new RegExp(`${action.text}`, "gi");
    //       return contact.name.match(regex);
    //     })
    //   };
    // case "CLEAR":
    //   return { ...state, filtered: null };
    case "ITEM_ERROR":
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default Reducer;

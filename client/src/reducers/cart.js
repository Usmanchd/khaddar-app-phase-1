const getcartdata = () => {
  const LS = localStorage.getItem('cart');
  return LS ? JSON.parse(LS) : [];
};
const getwishlistdata = () => {
  const LS = localStorage.getItem('wishlist');
  return LS ? JSON.parse(LS) : [];
};
const initialState = {
  cartitems: getcartdata(),
  wishlist: getwishlistdata(),
  orderslist: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'PLACE_ORDER':
      return {
        ...state,
        cartitems: [],
        // orderslist: [payload, ...state.orderslist],
      };
    case 'GET_ORDER_DATA':
      return {
        ...state,
        orderslist: payload,
      };

    case 'ADD_CART':
      return { ...state, cartitems: [payload, ...state.cartitems] };
    case 'UPDATE_CART':
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.cartitems.map((cartitem) =>
            cartitem._id === payload._id
              ? { ...payload, quantity: payload.quantity }
              : cartitem
          )
        )
      );
      return {
        ...state,
        cartitems: state.cartitems.map((cartitem) =>
          cartitem._id === payload._id
            ? { ...payload, quantity: payload.quantity }
            : cartitem
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartitems: state.cartitems.filter(
          (cartitem) => cartitem._id !== payload
        ),
      };
    case 'ADD_WISHLIST':
      return { ...state, wishlist: [payload, ...state.wishlist] };
    case 'REMOVE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== payload._id),
      };
    // case REMOVE_ALERT:
    //   return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}

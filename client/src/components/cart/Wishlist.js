import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { unLike } from "../../actions/cart";
import { addCart } from "../../actions/cart";
import { updateCart } from "../../actions/cart";

const Wishlist = ({ cart, unLike, addCart, updateCart }) => {
  useEffect(
    () => localStorage.setItem("wishlist", JSON.stringify(cart.wishlist)),
    [cart.wishlist]
  );
  const handleCart = (product) => {
    let index = cart.cartitems.findIndex((item) => item._id === product._id);
    if (index === -1) {
      let addProduct = { ...product, quantity: 1 };
      addCart(addProduct);
    } else {
      let addProduct = {
        ...product,
        quantity: (cart.cartitems[index].quantity += 1),
      };
      updateCart(addProduct);
    }
  };
  const handleUnLike = (item) => {
    unLike(item);
    // isWishlist(product);
  };
  return (
    <div>
      <div
        className="single-slider slider-height2 d-flex align-items-center"
        style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap text-center">
                <h2>Wish List</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="cart_area">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Like/Dislike</th>
                    <th scope="col">Add Cart</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.wishlist &&
                    cart.wishlist.map((item) => (
                      <tr>
                        <td>
                          <div className="media">
                            <div className="d-flex">
                              <img src={item.img} alt="" />
                            </div>
                            <div className="media-body">
                              <p>
                                <b>{item.decrip}</b>
                              </p>
                              <p>{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5></h5>
                        </td>
                        <td>
                          <h5></h5>
                        </td>
                        <td>
                          <h5>{item.price}</h5>
                        </td>
                        <td>
                          <div className="product_count">
                            <span>
                              {" "}
                              <button
                                style={{
                                  backgroundColor: "black",
                                  borderRadius: "20%",
                                }}
                                onClick={() => handleUnLike(item)}
                              >
                                UNLIKE
                              </button>
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="product_count">
                            <span>
                              {" "}
                              <button
                                style={{
                                  backgroundColor: "black",
                                  borderRadius: "20%",
                                }}
                                onClick={() => handleCart(item)}
                              >
                                Add To Cart
                              </button>
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}

                  <tr className="bottom_button">
                    <td>
                      <a className="btn_1" href="#">
                        <Link to="/Productslist">Continue Shopping</Link>
                      </a>
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
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { unLike, addCart, updateCart })(
  Wishlist
);

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCart } from '../../actions/cart';
import { updateCart } from '../../actions/cart';
import { addLike } from '../../actions/cart';
import { unLike } from '../../actions/cart';
import Singleproduct from './Singleproduct';

const ProductItems = ({ data, addCart, addLike, updateCart, unLike, cart }) => {
  useEffect(
    () => localStorage.setItem('cart', JSON.stringify(cart.cartitems)),
    [cart.cartitems]
  );
  useEffect(
    () => localStorage.setItem('wishlist', JSON.stringify(cart.wishlist)),
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

  const handleLike = (product) => {
    addLike(product);
    // isWishlist(product);
  };
  const handleUnLike = (product) => {
    unLike(product);
    // isWishlist(product);
  };
  const isWishlist = (product) => {
    let wishIds = cart.wishlist.map((c) => c._id);
    return wishIds.includes(product._id);
  };
  return (
    <div className="tab-content" id="nav-tabContent">
      {console.log('data in item', data)}
      <div
        className="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div className="row">
          {/* {console.log("latest is ", latest)} */}
          {data.map((product) => (
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-product mb-60">
                <div
                  className="product-img"
                  style={{ margin: '0', position: 'relative' }}
                >
                  <img
                    src={product.img}
                    alt="img"
                    width="100%"
                    style={{
                      width: '60%',
                    }}
                  />
                  <div
                    className="new-product"
                    style={{ position: 'absolute', top: '25px', left: '23px' }}
                  >
                    <span
                      style={{
                        background: '#ff003c',
                        padding: '3px 16px',
                        borderRadius: '30px',
                        color: '#fff',
                      }}
                    >
                      {product.type}
                    </span>
                  </div>

                  <div className="favorit-items">
                    {!isWishlist(product) ? (
                      <h3>
                        {' '}
                        <i
                          className="far fa-heart"
                          onClick={() => handleLike(product)}
                        ></i>
                      </h3>
                    ) : (
                      <h3>
                        <i
                          className="fas fa-heart"
                          onClick={() => handleUnLike(product)}
                        ></i>
                      </h3>
                    )}
                  </div>
                </div>
                <div className="product-caption"></div>
                <h4>
                  <Link to={`/${product._id}`} style={{ color: 'black' }}>
                    {product.name}({product.code})
                  </Link>
                </h4>
                <div className="price">
                  <ul>
                    <li>{product.price}</li>
                    <li
                      className="discount"
                      style={{
                        textDecorationLine: 'line-through',
                        fontSize: '15px',
                        opacity: '0.7',
                      }}
                    >
                      {product.discount}
                    </li>
                  </ul>
                </div>
                <h4>
                  <button
                    className="btn"
                    onClick={() => handleCart(product)}
                    style={{ padding: '25px' }}
                  >
                    Add to Cart
                  </button>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Singleproduct
        handleCart={handleCart}
        handleUnLike={handleUnLike}
        handleLike={handleLike}
        isWishlist={isWishlist}
      /> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  addCart,
  addLike,
  updateCart,
  unLike,
})(ProductItems);

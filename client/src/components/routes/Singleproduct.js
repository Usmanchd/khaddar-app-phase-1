import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCart } from '../../actions/cart';
import { updateCart } from '../../actions/cart';
import { Link } from 'react-router-dom';

const Singleproduct = ({
  data,
  cart,
  handleLike,
  handleUnLike,
  updateCart,
  addCart,
}) => {
  const { items } = data;
  let { id } = useParams();
  const singleproduct = items.filter((item) => item._id === id);
  console.log(singleproduct);
  const isWishlist = (product) => {
    let wishIds = cart.wishlist.map((c) => c._id);
    return wishIds.includes(product._id);
  };

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
  return (
    <div>
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <div id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div
            className="row"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {console.log(() => handleCart())}
            {singleproduct &&
              singleproduct.map((product) => (
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="single-product mb-60">
                    <div
                      className="product-img"
                      style={{ margin: '0', position: 'relative' }}
                    >
                      <img src={product.img} alt="img" width="100%" />
                      <div
                        className="new-product"
                        style={{
                          position: 'absolute',
                          top: '25px',
                          left: '23px',
                        }}
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
                      <a href="" style={{ color: 'black' }}>
                        {product.name} ({product.code})
                      </a>
                    </h4>
                    <h5>
                      <a href="" style={{ color: 'black' }}>
                        {product.descrip}
                      </a>
                    </h5>
                    <div className="price">
                      <ul>
                        <li>{product.price}</li>
                        <li
                          className="discount"
                          style={{ textDecorationLine: 'line-through' }}
                        >
                          {product.discount}
                        </li>
                      </ul>
                    </div>
                    <h4>
                      <button
                        className="btn"
                        style={{
                          padding: '20px',
                        }}
                        onClick={() => handleCart(product)}
                      >
                        ADD CART
                      </button>
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.addnewitem,
  cart: state.cart,
  addCart,
  updateCart,
});

export default connect(mapStateToProps)(Singleproduct);

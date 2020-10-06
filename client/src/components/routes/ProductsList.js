import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import ProductItems from './ProductItems';

const ProductsList = ({ cart, data }) => {
  console.log(data.items);
  const [filteredItems, setfilteredItems] = useState(data.items);
  console.log(filteredItems);

  const handleAll = (type) => {
    if (type === 'All') return setfilteredItems([...data.items]);
    setfilteredItems([...data.items.filter((item) => item.type === type)]);
  };

  return (
    <Fragment>
      {/* <div
        className="single-slider slider-height2 d-flex align-items-center"
        style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
      >
        <div className="container" id="Top">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap text-center">
                <h2>Product List</h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section class="latest-product-area ">
        <div class="container">
          <div class="row product-btn d-flex justify-content-end align-items-end">
            <div class="col-xl-4 col-lg-5 col-md-5">
              <div class="section-tittle mb-30" id="Latest">
                <h2>Products</h2>
              </div>
            </div>
            <div class="col-xl-8 col-lg-7 col-md-7">
              <div class="properties__button f-right">
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      class="nav-item nav-link active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      onClick={() => handleAll('All')}
                    >
                      All
                    </a>
                    <a
                      class="nav-item nav-link"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                      onClick={() => handleAll('new')}
                    >
                      New
                    </a>
                    <a
                      class="nav-item nav-link"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                      onClick={() => handleAll('featured')}
                    >
                      Featured
                    </a>
                    <a
                      class="nav-item nav-link"
                      id="nav-last-tab"
                      data-toggle="tab"
                      href="#nav-last"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                      onClick={() => handleAll('offer')}
                    >
                      Offer
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <ProductItems data={filteredItems} />
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
  data: state.addnewitem,
});

export default connect(mapStateToProps, {})(ProductsList);

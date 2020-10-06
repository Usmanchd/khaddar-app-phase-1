import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProductItems from "./ProductItems";

const LatestProducts = ({ data }) => {
  const latest = data.items.filter((product) => product.type === "new");

  return (
    <div>
      {/* <div
        className="single-slider slider-height2 d-flex align-items-center"
        style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap text-center">
                <h2> Latest Products</h2>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section class="latest-product-area padding-bottom">
        <div class="container">
          <div class="row product-btn d-flex justify-content-end align-items-end">
            <div class="col-xl-4 col-lg-5 col-md-5">
              <div class="section-tittle mb-30" id="Latest">
                <h2> Products</h2>
              </div>
            </div>
            <div class="col-xl-8 col-lg-7 col-md-7">
              <div class="properties__button f-right"></div>
            </div>
          </div>

          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <ProductItems data={latest} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.addnewitem,
  cart: state.cart,
});

export default connect(mapStateToProps, {})(LatestProducts);

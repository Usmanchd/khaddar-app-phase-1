import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Bestproduct = () => {
  return (
    <Fragment>
      <div class="best-product-area lf-padding">
        <div
          class="product-wrapper bg-height"
          // style="background-image: url('assets/img/categori/card.png')"
          style={{ backgroundImage: " url('assets/img/categori/card.png')" }}
        >
          <div class="container position-relative">
            <div class="row justify-content-between align-items-end">
              <div class="product-man position-absolute  d-none d-lg-block">
                <img src="assets/img/categori/card-man.png" alt="" />
              </div>
              <div class="col-xl-2 col-lg-2 col-md-2 d-none d-lg-block">
                <div class="vertical-text">
                  <span>Manz</span>
                </div>
              </div>
              <div class="col-xl-8 col-lg-8">
                <div class="best-product-caption">
                  <h2>
                    Find The Best Product
                    <br /> from Our Shop
                  </h2>
                  <p>Designers who are interesten creating state ofthe.</p>
                  <a class="black-btn" href="#Top">
                    <Link to="/Productslist">Shop Now</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="shape bounce-animate d-none d-md-block">
          <img src="assets/img/categori/card-shape.png" alt="" />
        </div>
      </div>
    </Fragment>
  );
};

export default Bestproduct;

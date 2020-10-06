import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ProductItems from "./ProductItems";

const Newcollection = ({ data }) => {
  console.log(data);
  let { name } = useParams();
  const cat = [];
  data.items.forEach((product) => {
    const product_categories = product.categories.map((cat) => cat.name);
    if (product_categories.includes(name)) cat.push(product);
  });

  console.log(cat);

  // const cat1 = cat.filter((product) => catName.includes(name));
  // console.log(cat1);
  // const summer = cat.filter((c) => c.name === name);
  // console.log(summer);

  return (
    <div>
      {/* <div
        className="single-slider slider-height2 d-flex align-items-center"
        style={{
          backgroundImage: "url('assets/img/hero/category.jpg')",
        }}
      > */}
        <div class="col-xl-4 col-lg-5 col-md-5">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>{name}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      {/* <div class="section-tittle mb-30" id="Latest">
        <h2> p</h2>
      </div> */}
      <div className="container mt-50">
        <ProductItems data={cat} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.addnewitem,
  cart: state.cart,
});

export default connect(mapStateToProps)(Newcollection);

import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Additems from "../Additems";
import ShowProducts from "./ShowProducts";
import AddCategory from "../AddCategory";
import ShowCat from "../ShowCat";
import Orderlist from "../Orderlist";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Body = () => {
  let { type } = useParams();
  let match = useRouteMatch();

  return (
    <div
      class="content"
      style={{ backgroundImage: "url('assets/img/hero/category.jpg')" }}
    >
      <Switch>
        <Route exact path={`/panel/addnewcategory`}>
          <div class="card">
            <AddCategory />
          </div>
        </Route>
        <Route exact path={`/panel/allcategories`}>
          <div class="card">
            <ShowCat />
          </div>
        </Route>
        <Route exact path={`/panel/allproducts`}>
          <div class="card">
            <ShowProducts />
          </div>
        </Route>
        <Route exact path={`/panel/addproducts`}>
          <div class="card">
            <Additems />
          </div>
        </Route>
        <Route exact path={`/panel/orderlist`}>
          <div class="card">
            <Orderlist />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Body;

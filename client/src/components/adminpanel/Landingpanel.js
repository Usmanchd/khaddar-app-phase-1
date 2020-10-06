import React from "react";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import Body from "./layout/Body";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./Admin.css";

const Landingpanel = () => {
  const handele = (type) => {};
  return (
    <div className="">
      <Header />

      <div class="mobile_nav">
        <div class="nav_bar">
          <img
            src="assets/img/categori/category_5.png"
            class="mobile_profile_image"
            alt=""
          />
          <i class="fa fa-bars nav_btn"></i>
        </div>
        <div class="mobile_nav_items">
          <Link to="/panel">
            <i class="fas fa-desktop"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/panel/orderlist">
            <i class="fas fa-desktop"></i>
            <span>Booked Order</span>
          </Link>
          <Link to="/panel/addnewcategory">
            <i class="fas fa-th"></i>
            <span>Add New Category</span>
          </Link>
          <Link to="/panel/allcategories">
            <i class="fas fa-th"></i>
            <span>All Categories</span>
          </Link>
          <Link to="/panel/addproducts">
            <i class="fas fa-th"></i>
            <span>Add New Products</span>
          </Link>
          <Link to="/panel/allproducts">
            <i class="fas fa-th"></i>
            <span>All Products</span>
          </Link>
        </div>
      </div>

      <div class="sidebar">
        <div class="profile_info">
          <img
            src="assets/img/categori/category_5.png"
            class="profile_image"
            alt=""
          />
          <h4>K.KHADDAR</h4>
        </div>
        <Link to="/panel">
          <i class="fas fa-desktop"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/panel/orderlist">
          <i class="fas fa-desktop"></i>
          <span>Booked Order</span>
        </Link>
        <Link to="/panel/addnewcategory">
          <i class="fas fa-th"></i>
          <span>Add New Category</span>
        </Link>
        <Link to="/panel/allcategories">
          <i class="fas fa-th"></i>
          <span>All Categories</span>
        </Link>
        <Link to="/panel/addproducts">
          <i class="fas fa-th"></i>
          <span>Add New Products</span>
        </Link>
        <Link to="/panel/allproducts">
          <i class="fas fa-th"></i>
          <span>All Products</span>
        </Link>
      </div>
      <Body />
    </div>
  );
};

export default Landingpanel;

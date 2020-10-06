import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

const Header = ({ logout }) => {
  return (
    <div className="headera">
      <label for="check">
        <i class="fas fa-bars" id="sidebar_btn"></i>
      </label>
      <div class="left_area">
        <h3>
          Admin <span>panel</span>
        </h3>
      </div>
      <div class="right_area">
        <a href="#" class="logout_btn" onClick={() => logout()}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Header);

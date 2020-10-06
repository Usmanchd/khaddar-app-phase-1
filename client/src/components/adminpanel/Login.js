import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { useHistory } from "react-router-dom";
const Login = ({ login, auth: { isAuthenticated } }) => {
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/panel");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onchange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please fill all fields");
    } else {
      login(user);
    }
    console.log("Login", user);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="form-container"
        style={{
          backgroundColor: "lightgrey",
          padding: "40px",
        }}
      >
        <h1>
          <b className="success">Login</b>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              value={email}
              onChange={onchange}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={onchange}
            ></input>
          </div>
          <input
            type="submit"
            value="LOGIN"
            className="btn btn-success"
          ></input>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);

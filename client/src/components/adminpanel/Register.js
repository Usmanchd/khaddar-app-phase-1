import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../actions/auth";

const Login = ({ register, auth: { isAuthenticated } }) => {
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/panel");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const onchange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please fill all fields");
    } else {
      register(user);
    }
  };
  return (
    <div className="form-container">
      <h1>
        <b className="success">Login</b>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            type="name"
            name="name"
            value={name}
            onChange={onchange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onchange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onchange}
            required
          ></input>
        </div>
        <input type="submit" value="LOGIN" className="btn btn-success"></input>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Login);

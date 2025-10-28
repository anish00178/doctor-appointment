import React, { useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`${import.meta.env.BASE_URL}/api/v1/user/login`,{email,password})
      // console.log("login==> ", name, email, password);
      console.log(res)
      toast.success("login successfully");
      navigate("/profile");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="card">
          <h2>Login</h2>
          <p>please enter your email & password</p>
          <div className="form-group mb-3"></div>
          <div className="form-group mb-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={!email || !password}
            onClick={handleSubmit}
          >
            LOGIN
          </button>
          <p className="mt-3">
            {" "}
            Not A user ? <NavLink to="/register">Register here!</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
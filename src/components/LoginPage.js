import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ setDataEmail }) => {
  const [innemail, setInnEmail] = useState("");
  const [innpass, setInnPass] = useState("");
  const API_URL =
    "https://login-page-url-shortend-react.onrender.com/api/authenticate"; //POST

  let [errEmail, setErrEmail] = useState("");
  let [errPass, setErrPass] = useState("");

  const navigate = useNavigate();

  const handleCompare = () => {
    axios
      .post(API_URL, {
        email: innemail,
        password: innpass,
      })
      .then((res) => {
        setDataEmail(res.data.email);
        setInnEmail("");
        setInnPass("");
        alert("Successfully Login!");
        navigate("/URL-table");
        setErrEmail("");
        setErrPass("");
      })
      .catch((err) => {
        console.log(err.message);
        errEmail = "Username or Password Incorrect";
        errPass = "Username or Password Incorrect";
        setErrEmail(errEmail);
        setErrPass(errPass);
      });
  };

  return (
    <div className="conatiner">
      <form id="login-form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={innemail}
            onChange={(e) => setInnEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text" style={{ color: "red" }}>
            {errEmail}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={innpass}
            onChange={(e) => setInnPass(e.target.value)}
          />
          <div id="emailHelp" className="form-text" style={{ color: "red" }}>
            {errPass}
          </div>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCompare}
          >
            Login
          </button>
          <Link to="/register">
            <button type="button" id="register" className="btn btn-primary">
              Register
            </button>
          </Link>
          <Link to="/reset-password">
            <button id="reset" type="button" className="btn btn-primary">
              Forget Password
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

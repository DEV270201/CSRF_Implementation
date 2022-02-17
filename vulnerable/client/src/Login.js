import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const Login = () => {
  const [details, setDetails] = useState({
    "email": "",
    "password": ""
  });

  const update = (e) => {
    const { name, value } = e.target;
    setDetails((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:4000/login", details);
      console.log("response : ", resp);
      alert("user logged in");
    } catch (err) {
      console.log("error..");
      alert("something went wrong!");
    }
  }

  return (
    <>
      <div className="container">
        <div className="title">
          <p>Please Enter your Login Credentials</p>
          <div className="form">
            <div className="form-box">
              <input type="text" placeholder="Enter your Email" value={details.email} onChange={update} name="email" />
            </div>
            <div className="form-box">
              <input type="password" placeholder="Enter your Password" value={details.password} onChange={update} name="password" />
            </div>
            <button type="submit" onClick={submit}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
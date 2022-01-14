import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../App";
import Swal from 'sweetalert2';

export default function Login() {
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  async function loginUser(e) {
    e.preventDefault();
    const cred = { email, password };
    console.log("login function ----->", cred);
    axios
      .post("http://3.142.72.8:3000/v1/admin/login", cred)
      .then(function (res) {
        console.log("-----data from res---->", res.data);
        dispatch({
          type: "LOGIN",
          payload: res
        })
        console.log("-------> dispatch---->", dispatch.payload)
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
  
          navigate("/home");
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title:  "Wrong credentials!"
        })
        console.log(err);
      });
  }
  return (
    <div className="container">
      <div className="login_container">
        <div className="title">SecureText</div>
        <div className="title">ADMIN PANEL</div>
        <div className="login-form">
          <form method="POST">
            <div className="field_container">
              <div className="child_container">
                <label className="form-control-label">USERNAME</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="sudhaak"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="child_container">
                <label className="form-control-label">PASSWORD</label>
                <br />
                <input
                  type="password"
                  placeholder="******"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="loginbttm">
              <button className="btn" onClick={loginUser}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

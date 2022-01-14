import React, { useState, useEffect } from "react";
import "./AddUser.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Select from 'react-select'
import Layout from "../Layout"
const Adduser = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");

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

  function uploadProfilePic () { }

  function imageHandler (e) {
    const reader = FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ]
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'nurse', label: 'Nurse' }
  ]

  async function AddUser (e) {
    e.preventDefault();
    const cred = {
      email,
      name,
      profilePicture,
      username,
      dob,
      gender,
      role,
      phonenumber,
    };
    console.log("login function ----->", cred);
    const token = localStorage.getItem("token");
    // console.log("token from local storage to addUser......", token)
    await axios
      .post("http://3.142.72.8:3000/v1/admin/createStaffProfile", cred, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer "+`${token}`,
        },
      })
      .then(function (res) {
        console.log(res.data);
        Toast.fire({
          icon: 'success',
          title: 'User created successfully'
        })
        navigate("/home")
      })
      .catch((err) => {
        Toast.fire({
          icon: 'error',
          title: 'Something went wrong!'
        })
        console.log(err);
      });
  }
  return (
    <Layout>
      <div className="container_user">
        <div className="login_container_user">
          <div className="title_user">SecureText Admin Panel</div>
          <div className="title_user">Add New User</div>
          <br />
          <div className="login-form_user">
            <form method="POST" onSubmit={AddUser}>
              <div className="field_container_user">
                <div className="child_container_user">
                  <div className="child_container_user">
                    <label className="form-control-label">NAME</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      placeholder="Your full name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="child_container_user">
                    <label className="form-control-label">USERNAME</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      placeholder="Your unique username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="child_container_user">
                    <label className="form-control-label">
                      DATE OF BIRTH
                    </label>
                    <br />
                    <input
                      type="date"
                      className="form-control"
                      value={dob}
                      data-date-format="DD MMMM YYYY"
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                  <div className="child_container_small">
                    <div className="small_cont">
                      <label className="form-control-label">GENDER</label>
                      <br />
                      <Select className="select_box" options={genderOptions} onChange={(e) => setGender(e.value)} placeholder="Gender" />
                    </div>
                    <div className="small_cont">
                      <label className="form-control-label">ROLE</label>
                      <br />
                      <Select className="select_box" options={roleOptions} onChange={(e) => setRole(e.value)} placeholder="Role" />
                    </div>
                  </div>
                  <div className="child_container_user">
                    <label className="form-control-label">EMAIL</label>
                    <br />
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      placeholder="Your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="child_container_user">
                    <label className="form-control-label">PHONE NUMBER</label>
                    <br />
                    <input
                      type="tel"
                      className="form-control telphone"
                      value={phonenumber}
                      placeholder="Your phone number"
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="small_widget">
                  <div className="profile_image" onClick={uploadProfilePic}>
                    <div className="image_holder">
                      <img
                        src="https://cdn.icon-icons.com/icons2/2442/PNG/512/add_profile_user_icon_148635.png"
                        className="profile_pic"
                      ></img>
                      <img src={image_url} if={image_url} id="profile_pic"></img>
                    </div>
                    <input
                      type="file"
                      className="form-control image_upload"
                      value={profilePicture}
                      accept="image/*"
                      onChange={imageHandler}
                      onChange={(e) => setProfilePicture(e.target.value)}
                    />
                    <div className="label_pic">
                         <label htmlFor="input" className="image_upload">
                         <BsFillFileEarmarkImageFill className="icon"/> Choose Profile Pic
                         </label>
                      </div>
                  </div>
                </div> */}
              </div>
              <div className="loginbttm">
                <button className="button" >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adduser;

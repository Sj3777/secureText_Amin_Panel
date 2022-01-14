import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import Layout from "../Layout";
const Home = () => {
  const navigate = useNavigate();
  function addNewUser() {
    navigate("/addUser");
  }
  return (
    <Layout>
      <div className="home_cont">
        <div className="title_home">SecureText Admin Panel</div>
        <div className="add_home">Add a new user</div>
        <div className="items">
          <br />
          <button className="button" onClick={addNewUser}>
            Add User
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

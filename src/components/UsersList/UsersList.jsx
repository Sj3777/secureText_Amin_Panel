import React, { useEffect, useState } from "react";
import "./UserList.css";
import axios from "axios";
import Layout from "../Layout";
import userImage from "../UsersList/userImage.jpg";
const UserList = () => {
  const [staffData, setStaffData] = useState([]);
  console.log("getting user data----->", staffData);
  async function getAllUsers() {
    await axios
      .get("http://3.142.72.8:3000/v1/admin/getStaffProfile", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        setStaffData(res.data.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
     <div className="table_container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">index</th>
            <th scope="col">Name</th>
            <th scope="col">UserName</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Gender</th>
            <th scope="col">DOB</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((val, key) => {
            return (
              <tr>
                <th scope="row">{key}</th>
                <td >{val.name}</td>
                <td>{val.username}</td>
                <td>{val.phonenumber}</td>
                <td>{val.gender}</td>
                <td>{val.dob}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </Layout>
  );
};

export default UserList;

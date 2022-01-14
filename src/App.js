import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "../src/components/Layout";

import Login from "../src/components/Login/Login";
import Home from "../src/components/Home/Home";
import AddUser from "../src/components/AddUser/AddUser";
import UserList from "./components/UsersList/UsersList";
import Logger from "./components/Logger/Logger";
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.data.data.user.name)
      );
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.data.data.token)
      );
      console.log(
        "......reducer function------>",
        action.payload.data.data.user.name
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.data.user.name,
        token: action.payload.data.data.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
function App () {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log("------state---->", state);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {/* <Route exact path="/home" element={!state.isAuthenticated ? <Login /> : <Home />} /> */}
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/usersList" element={<UserList />} />
          <Route path="/logger" element={<Logger />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>

      {/* <Layout>
        <Router>
          {state.isAuthenticated ? (
            <Routes>
            {state.isAuthenticated  && ( <>
              <Route path="/home" element={<Home />}/>
              <Route path="/addUser" element={ <AddUser />} />
              <Route path="/usersList" element={<UserList />} />
              <Route path="/logger" element={<UserList />} />
            </>)}
            </Routes>
          ) : (
            <Routes>
              <Route path="/" exact element={<Login />} />
            </Routes>
          )}
        </Router>
      </Layout> */}
    </AuthContext.Provider>
  );
}
export default App;



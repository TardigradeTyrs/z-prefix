import React, { useState, useEffect, useRef, useContext } from "react";
import { loggedInContext } from "./Global-Context"
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
  const [newUser, setNewUser] = useState({});
  const { setLoggedInUser } = useContext(loggedInContext);
  const [renderNewAccount, setRenderNewAccount] = useState(false);
  const pageRendered = useRef(false);
  const [logIn, setLogIn] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (pageRendered.current) {
      fetch("http://localhost:8080/createAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then((res) => {
        if (res.status === 201) {
          setRenderNewAccount(false);
          alert("Account Created! Please Log In");
        }
      });
    }

  }, [newUser]);

  const HandleNewUser = (e) => {
    e.preventDefault();
    setNewUser({
      First_Name: document.getElementById("first_name").value,
      Last_Name: document.getElementById("last_name").value,
      Username: document.getElementById("username").value,
      Password: document.getElementById("password").value,
    });
  };
  useEffect(() => {
    if (pageRendered.current) {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logIn),
      }).then(async (res) => {
        if (res.status === 200) {
          let user = await res.json();
          setLoggedInUser(user[0].UserId);
          navigate('/inventory')
        }
      });
    }
    pageRendered.current = true;
  }
  , [logIn]);

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLogIn({
      Username: document.getElementById("username").value,
      Password: document.getElementById("password").value,
    });
  };

  return (
    <>
      <h1>Inventory Manager Login</h1>
      {renderNewAccount === true ? (
        <form>
          <label>First Name:</label>
          <input type="text" id="first_name" />
          <label>Last Name:</label>
          <input type="text" id="last_name" />
          <label>Username: </label>
          <input type="text" id="username" />
          <label>Password:</label>
          <input type="password" id="password" />
          <button onClick={(e) => HandleNewUser(e)}>Submit</button>
        </form>
      ) : (
        <form>
          <label>Username:</label>
          <input type="text" id="username" />
          <label>Password:</label>
          <input type="password" id="password" />
          <button onClick={(e) => handleLogIn(e)}>Login</button>
          <button onClick={() => setRenderNewAccount(true)}>
            Create New Account
          </button>
        </form>
      )}
    </>
  );
};

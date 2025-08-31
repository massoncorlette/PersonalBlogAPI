
{/* import { useState, useEffect } from 'react' */}
{/*maybe import local styles */}
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    alias: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  //validate and sanitize for user exp frontend, deep validation backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:5000/sign-up', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
    })
    .then(async (response) => {
      if (response.status == 401) {
        throw new Error("Wrong email or password");
      }

      if (response.status > 401) {
        throw new Error("server error");
      }

      const data = await response.json();
      console.log(data);
      navigate("/"); 
    })
    .catch((error) => setError(error))
    .catch((errors) => setError(errors))

  };

  //handler function for user info
  const updateInfo = (value, propType) => {

    const changeUser = {...user, [propType]:value};

    setUser(changeUser);
  };


  return (
    <>
    {error ? (
      <ul>
        {error.map((err, index) => (
          <li key={index}>{err.msg}</li>
        ))}
      </ul>
    ) : null}
        
    <div id="signupForm">
      <form 
        onSubmit={handleSubmit} 
        method="POST" 
        id="signupForm" 
        autoComplete="off"
      >
        <div className="signupField">
          <input
            id="firstname"
            className="signupInput"
            name="firstname"
            autoComplete="off"
            placeholder="First Name"
            type="text"
            onChange={(event) => updateInfo(event.target.value, "fname")}
          />
        </div>

        <div className="signupField">
          <input
            id="lastname"
            className="signupInput"
            name="lastname"
            autoComplete="off"
            placeholder="Last Name"
            type="text"
            onChange={(event) => updateInfo(event.target.value, "lname")}
          />
        </div>

        <div className="signupField">
          <input
            id="email"
            className="signupInput"
            name="username"
            autoComplete="off"
            placeholder="Email"
            type="email"
            onChange={(event) => updateInfo(event.target.value, "email")}
          />
        </div>

        <div className="signupField">
          <input
            id="alias"
            className="signupInput"
            name="alias"
            autoComplete="off"
            placeholder="Username"
            type="text"
            onChange={(event) => updateInfo(event.target.value, "alias")}
          />
        </div>

        <div className="signupField">
          <input
            id="password"
            className="signupInput"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => updateInfo(event.target.value, "password")}
          />
        </div>

        <div className="signupField">
          <input
            id="passwordconfirm"
            className="signupInput"
            name="passwordconfirm"
            type="password"
            placeholder="Repeat Password"
          />
        </div>

        <div className="formBtns">
          <button type="submit" id="signupBtn">Sign Up</button>
          <Link to="/">
            <button type="button">Login</button>
          </Link>
        </div>
      </form>
    </div>
   </>
  )
}

export default SignUp;
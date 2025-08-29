
/* import { useState, useEffect } from 'react' */
/*maybe import local styles */
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


// eslint-disable-next-line react-refresh/only-export-components

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    // Handle server response (e.g., store token, redirect)
  };
  return (
    <>
      <div id="loginForm"  >
        <form 
          onSubmit={handleSubmit} 
          method="POST" 
          id="loginFormInput" 
          autoComplete="off"
        >
          <div className="loginInput">
            <input 
             onChange={(e) => setUsername(e.target.value)}
             id="email" 
             name="username" 
             autoComplete="off" 
             placeholder="Enter Email" 
             type="text" 
            />
          </div>
          <div className="loginInput">
            <input 
            onChange={(e) => setPassword(e.target.value)} 
            id="password" 
            name="password"  
            autoComplete="new-password" 
            placeholder="Enter Password" 
            type ="password" 
            />
          </div>
          <div className="formBtns">
            <button type="submit" id="loginBtn">Log In</button>
          </div>
        </form>
          <div className="formBtns" id="signUp">
            <div >
              Not a member? 
            </div>
            <Link to="/sign-up">
              <button>Sign Up!</button>
            </Link>
          </div>
      </div>
    </>
  )
}

export default Login;
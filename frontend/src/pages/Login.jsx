
/* import { useState, useEffect } from 'react' */
/*maybe import local styles */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";



// eslint-disable-next-line react-refresh/only-export-components

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  //JWT removed from local storage upon mount (redirect to login page)
  localStorage.removeItem('usertoken');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:5000/', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(async (response) => {
      if (response.status == 401) {
        throw new Error("Wrong email or password");
      }

      if (response.status > 401) {
        throw new Error("server error");
      }
    // store token locally and navigate to home route where GET request fetch
      const data = await response.json();
      localStorage.setItem('usertoken', data.token);
    })
    .catch((error) => setError(error))

    if (error !== null) {
      navigate("/home"); 
    }
  };

  return (
    <>
    {error ? (
      <p>A network error was encountered: {error.message}</p>
    ) : null}

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
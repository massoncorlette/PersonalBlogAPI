
{/* import { useState, useEffect } from 'react' */}
{/*maybe import local styles */}

import { Link } from "react-router-dom";

function SignUp() {

  return (
    <>
      <form action="/sign-up" method="POST" id="signupForm" autoComplete="off">
        <div className="signupField">
          <input
            id="firstname"
            className="signupInput"
            name="firstname"
            autoComplete="off"
            placeholder="First Name"
            type="text"
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
          />
        </div>

        <div className="signupField">
          <input
            id="password"
            className="signupInput"
            name="password"
            type="password"
            placeholder="Password"
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
 
    </>
  )
}

export default SignUp;
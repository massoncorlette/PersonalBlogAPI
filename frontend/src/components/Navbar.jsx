import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async (event) => {

    event.preventDefault();
    await fetch('http://localhost:5000/log-out', {
      mode: 'cors',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    .then(async (response) => {

      if (response.ok) {
        navigate("/"); 
      }
    })
  }

  return (
    <>
      <div id="navbarContainer">
      <h1>Blog Official Home</h1>
        <div id="logoutContainer">
          <button id="logoutBtn" onClick={handleLogout}>
            <img src="/logout.svg"></img>
          </button>
        </div>
      </div>


    </>
  )
}

export default Navbar;
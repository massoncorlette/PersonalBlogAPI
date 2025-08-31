{/* import { useState, useEffect } from 'react' */}
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from "./Login";
import HomePage from "./HomePage";
import SignUp from "./Signup";
import '../styles/App.css'

function Home() {
  const { name } = useParams();

  const [user, setUser] = useState(null);
 // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('usertoken');
  console.log(token, "tested");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/home', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setUser(result);
      } catch (error) {
        setError(error);
      } 
    };

    fetchData();
  }, [token]);  // token dependency?

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h1>Welcome home {user.alias} </h1>

    {name === "home" ? (
      <HomePage user={user}/>
    ) : name === "sign-up" ? (
      <SignUp />
    ) : (
      <Login />
    )}
  </div>
  )
}

export default Home;
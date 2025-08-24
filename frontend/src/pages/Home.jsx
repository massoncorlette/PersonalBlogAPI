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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/home'); // Example API
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
  }, []);

  return (
    <div>
    <h1>Hello from home page!</h1>

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
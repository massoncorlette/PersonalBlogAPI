{/* import { useState, useEffect } from 'react' */}
import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import HomePage from "./HomePage";


function Home() {
  const { name } = useParams();

  const [user, SetUser] = useState(null);
  const [posts, SetPosts] = useState(null);
 // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('usertoken');
  console.log(token, "tested");

  useEffect(() => {
    const fetchUser = async () => {
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
        
        SetUser(result.user);
        SetPosts(result.posts)
      } catch (error) {
        setError(error);
      } 
    };

    fetchUser();
  }, [token]);  // token dependency?

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet context={{user, posts}} />
    </>


  )
}

export default Home;
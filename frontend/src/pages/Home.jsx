{/* import { useState, useEffect } from 'react' */}
import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {

  const [user, SetUser] = useState(null);
  const [posts, SetPosts] = useState(null);
  const [fetched, SetNewFetch] = useState(false);
  const [loading, SetLoading] = useState(true);
  const [success, SetSuccess] = useState(false);
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
        SetPosts(result.posts);
        // reset boolean fetch after updated posts fetch
        SetNewFetch(false);
      } catch (error) {
        setError(error);
      } 
    };
    fetchUser();
  }, [token, fetched]);  // token dependency?

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
      <Outlet context={{user, posts, loading, success, SetLoading, SetSuccess, SetNewFetch, }} />
    <Footer/>
    </>


  )
}

export default Home;
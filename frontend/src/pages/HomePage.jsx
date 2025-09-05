
{/* import { useState, useEffect } from 'react' */}
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";

function HomePage( user ) {
  console.log(user);
  if (!user) return <p>Loading...</p>;

  if (user.user.admin == true) {
    return (
      <>
      <h1>Welcome, {user.first} admin!</h1>
      
      <CreatePost user={user}/>
      </>

    ) 

  }

}

export default HomePage;
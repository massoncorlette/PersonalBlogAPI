
{/* import { useState, useEffect } from 'react' */}
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage( user ) {
  
  if (!user) return <p>Loading...</p>;

  if (user.user.admin) {
    return (
      <>
        <Navbar />
        <div>Welcome, {user.user.alias} as admin!</div>
        <CreatePost user={user} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
        <div>Welcome home, <i>{user.user.alias}</i> </div>
      <Footer />
    </>
  );
}

export default HomePage;
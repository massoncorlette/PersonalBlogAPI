
{/* import { useState, useEffect } from 'react' */}
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostPreview from "../components/PostPreview";

function HomePage( data ) {
  
  if (!data) return <p>Loading...</p>;

  if (data.user.admin) {
    return (
      <>
        <Navbar />
        <div>Welcome, {data.user.alias} as admin!</div>
        <CreatePost user={data} />
        <div id="postsPreviewContainer">
          <PostPreview posts={data.posts} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
        <div>Welcome home, <i>{data.user.alias}</i> </div>
        <div id="postsPreviewContainer">
          <PostPreview posts={data.posts} />
        </div>
      <Footer />
    </>
  );
}

export default HomePage;

import { useEffect, useState } from 'react';
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostPreview from "../components/PostPreview";
import PostDetails from "../components/PostDetails";

function HomePage( data ) {

  const [postid, SetPost] = useState(null);
  
  if (!data) return <p>Loading...</p>;

  if (postid) {
    return (
      <>
       <Navbar />
        <PostDetails postdata={data.posts} postid={postid}/>
      <Footer/>
      </>
    )
  }

  if (data.user.admin) {
    return (
      <>
        <Navbar />
        <div>Welcome, {data.user.alias} as admin!</div>
        <CreatePost user={data} />
        <div id="postsPreviewContainer">
          <PostPreview posts={data.posts} setPost={SetPost}/>
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
          <PostPreview posts={data.posts} setpost={SetPost}/>
        </div>
      <Footer />
    </>
  )
}

export default HomePage;
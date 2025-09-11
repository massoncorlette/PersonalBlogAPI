
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";
import PostPreview from "../components/PostPreview";

function HomePage() {
  const { user, posts, loading, success, SetSuccess, SetLoading, SetNewFetch } = useOutletContext();

  //spinner upon mount with delay, post creation message with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      SetLoading(false);
    }, 2000);

    const successTimer = setTimeout(() => {
      SetSuccess(false);
    }, 5000);
    return () => clearTimeout(timer, successTimer); 
  } ,[loading, SetSuccess, SetLoading]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (user.admin) {
    return (
      <>
        <div>Welcome, {user.alias} as admin!</div>

        {success ? (
         <p>Post Created Succesfully!</p>
        ) : null}

        <CreatePost setLoading={SetLoading} SetNewFetch={SetNewFetch} SetSuccess={SetSuccess}/>
        <div id="postsPreviewContainer">
          <PostPreview posts={posts}/>
        </div>
      </>
    );
  }

  return (
    <>
      <div>Welcome home, <i>{user.alias}</i> </div>
      <div id="postsPreviewContainer">
        <PostPreview posts={posts}/>
      </div>
    </>
  )
}

export default HomePage;
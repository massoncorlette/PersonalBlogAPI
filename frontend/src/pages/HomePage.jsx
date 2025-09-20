
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";
import PostPreview from "../components/PostPreview";

function HomePage() {
  const { user, posts, success, SetSuccess, SetLoading, SetNewFetch } = useOutletContext();

  
  if (user.admin) {
    return (
      <>
        <div>Welcome, {user.alias} as admin!</div>

        {success ? (
         <p>Post Created Succesfully!</p>
        ) : null}

        <CreatePost SetLoading={SetLoading} SetNewFetch={SetNewFetch} SetSuccess={SetSuccess}/>
        <div id="postsPreviewContainer">
          <PostPreview posts={posts} user={user}/>
        </div>
      </>
    );
  }

  return (
    <>
      <div>Welcome home, <i>{user.alias}</i> </div>
      <div id="postsPreviewContainer">
        <PostPreview posts={posts} user={user}/>
      </div>
    </>
  )
}

export default HomePage;
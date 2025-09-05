import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function PostPreview(posts) {

  console.log(posts.posts.length, 'test', posts)

  return (
    <>
  {posts.posts.length > 0 && posts.posts.map((post, index) => (
    <div key={post.id}> 
      <div>{post.title}</div>
      <div>{post.createdAt}</div>
    </div>
  ))}

  

    
    </>
  )
};

export default PostPreview;
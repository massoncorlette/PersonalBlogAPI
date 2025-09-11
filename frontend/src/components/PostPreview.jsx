import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PostPreview({posts}) {

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line react/prop-types

  const handleNavigate = async (postId, event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5000/home/posts/${postId}`, {
      method: 'GET'
    });
    if (!response.ok) {
      setError("server error");
      throw new Error(`HTTP error! status: ${response.status}`);
    }  
    const result = await response.json();


    if (!error) {
      navigate(`/home/post/${result.post.id}`,{ state: { posts: posts, postId:postId } }) ;
    }
  }

  return (
    <>
  {posts.map((post, index) => (
    <div key={post.id} className='postPreview'> 
      <button onClick={(e) => handleNavigate(post.id, e)} >
        <div>{post.title}</div>
        <div>{post.createdAt}</div>
      </button>
    </div>
  ))}

    </>
  )
};

export default PostPreview;
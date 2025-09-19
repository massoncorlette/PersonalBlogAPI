import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PostPreview({posts}) {
  const { SetPost, postDetails } = useOutletContext();

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

    //Set Post details in parent Home component, then navigate to post details route
    if (!error) {
      SetPost(result.post);
      navigate(`/home/post/${result.post.id}`) ;
    }
  }

  return (
    <>
  {posts.map((post, index) => (
    <div key={post.id} className='postPreview'> 
      <button onClick={(e) => handleNavigate(post.id, e)} >
        <div>{post.title}</div>
        <div>{post.createdAt}</div>
        {post.public ? (
          <div className='publicBtnContainer'>
            Published
          </div>
        ) : (
          <div className='publicBtnContainer'>
            Unpublished
          </div>
        )}
      </button>
    </div>
  ))}

    </>
  )
};

export default PostPreview;
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PostPreview({posts}) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types

  const handleNavigate = async (postId, event) => {
    event.preventDefault();
    navigate(`/home/post/${postId}`);
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
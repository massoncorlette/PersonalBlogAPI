import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PostDetails() {
  const location = useLocation();
  const { posts, postId } = location.state || {}; 

  const [post, SetPostDetails] = useState(null);

  useEffect(() => {
    posts.forEach(element => {
      if (element.id == postId) {
        SetPostDetails(element);
      }
    });
  }, [posts, postId]);


  if (!posts) {
    return <p>No data received.</p>;
  }

  return (
    <>
      <div>
        Post Details!
      </div>
    
    </>
  )
}

export default PostDetails;
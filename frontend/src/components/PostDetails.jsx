import { useState } from "react";
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PostDetails() {
  const location = useLocation();
  const { posts, postId } = location.state || {}; 

  const [post, SetPostDetails] = useState(null);

  if (!posts) {
    return <p>No data received.</p>;
  }

  console.log(posts);

  // eslint-disable-next-line react/prop-types
  posts.forEach(element => {
      if (element.id == postId) {
        SetPostDetails(element);
      }
  });

  return (
    <>
      <div>
        Post Details!
      </div>
    
    </>
  )
}

export default PostDetails;
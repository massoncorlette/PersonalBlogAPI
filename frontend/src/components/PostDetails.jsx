import { useState } from "react";

// eslint-disable-next-line react/prop-types
function PostDetails({postdata, postid}) {

  const [post, SetPostDetails] = useState(null);

  console.log(postdata);

  // eslint-disable-next-line react/prop-types
  postdata.forEach(element => {
      if (element.id == postid) {
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
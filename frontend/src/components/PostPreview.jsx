import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from '../styles/Postspreview.module.css';


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
      <div className={styles.postsPreviewContainer}>
        {posts.map((post, index) => (
          <div key={post.id} className={styles.postPreview}> 
            <button onClick={(e) => handleNavigate(post.id, e)} >
              <div>{post.title}</div>
              <div>{post.createdAt}</div>
              {post.public ? (
                <div className={styles.publicBtnContainerPublished}>
                  Published
                </div>
              ) : (
                <div className={styles.publicBtnContainerUnpublished}>
                  Unpublished
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  )
};

export default PostPreview;
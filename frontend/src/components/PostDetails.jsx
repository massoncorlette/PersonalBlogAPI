import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styles from '../styles/Createform.module.css';

 
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

  if (post) {
    return (
      <>
        <div className={styles.postDetailsContainer}>
          <div>
            <div className={styles.form}>
              <h2 className={styles.title}>{post.title}</h2>
              <p className="post-body">{post.content}</p>
              <small className="post-date">{post.createdAt}</small>
            </div>
            <div className={styles.formInput}>
              <input type="text" placeholder="Write a comment..." className={styles.input} />
              <button className="comment-button">Add</button>
            </div>
          </div>
          <div>
            <h3>Comments</h3>
            <div className="comments-list">
              <p>No comments yet</p>
            </div>
          </div>  
        </div>
      </>
    )
  }

}

export default PostDetails;
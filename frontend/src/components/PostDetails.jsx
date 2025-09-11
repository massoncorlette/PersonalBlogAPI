import { useState, useEffect } from "react";
import { useLocation, useOutletContext } from 'react-router-dom';
import styles from '../styles/Createform.module.css';

 
function PostDetails() {
  const location = useLocation();
  const { posts, postId } = location.state || {}; 

  const { loading, success, SetSuccess, SetLoading, SetNewFetch } = useOutletContext();

  const [error, SetError] = useState(null);
  const [comment, SetComment] = useState("");
  const [post, SetPostDetails] = useState(null);

  const token = localStorage.getItem('usertoken');

  useEffect(() => {
    posts.forEach(element => {
      if (element.id == postId) {
        SetPostDetails(element);
      }
    });
  }, [posts, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/home/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          comment
        }),
      });

      if (!response.ok) {
        SetError("Failed to create comment");
        return;
      }

      if (response.ok) {
        SetNewFetch(true);
        SetLoading(true);
        SetSuccess(true);
      }


    } catch (err) {
      SetError(err);
    }
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
              <form 
              onSubmit={handleSubmit}
              >
                <div>
                  <input 
                  onChange={(e) => SetComment(e.target.value)}
                  type="text" 
                  placeholder="Write a comment..." 
                  className={styles.input} />
                  <button 
                  className="comment-button"
                  >Add</button>
                </div>
              </form>

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
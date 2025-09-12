import { useState, useEffect } from "react";
import { useLocation, useOutletContext } from 'react-router-dom';
import styles from '../styles/Createform.module.css';

 
function PostDetails() {
  const location = useLocation();
  const { post } = location.state || {}; 

  const { SetLoading } = useOutletContext();

  const [error, SetError] = useState(null);
  const [comment, SetComment] = useState("");
  const [comments, SetUpdatedComments] = useState(null)

  const token = localStorage.getItem('usertoken');

  useEffect(() => {
    async () => {
      try {
        const response = await fetch(`http://localhost:5000/home/posts/${post.id}/comments`, {
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
        const result = await response.json();
  
        if (response.ok) {
          console.log(result);
          SetUpdatedComments(result.comments);
          SetLoading(true);
        }
  
      } catch (err) {
        SetError(err);
      }
    };
  });

  function handleSubmit() {
    SetLoading(true);
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
              onSubmit={() => handleSubmit}>
                  {error ? (
                  <p>A network error was encountered: {error}</p>
                ) : null}
                <div className={styles.formInputCommentContainer}>
                  <input 
                  onChange={(e) => SetComment(e.target.value)}
                  type="text" 
                  placeholder="Write a comment..." 
                  className={styles.input} />
                  <button 
                  className="comment-button"
                  type="submit"
                  >Add</button>
                </div>
              </form>

            </div>
          </div>
          <div>
            <h3>Comments</h3>
              {comments ? (
              <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={comment.id} className='postPreview'> 
                  <div>{comment.content}</div>
                </div>
              ))}
            </div>) : null}
          </div>  
        </div>
      </>
    )
  }

}

export default PostDetails;
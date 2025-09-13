import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import styles from '../styles/Createform.module.css';

 
function PostDetails() {
  const { postDetails, SetPost, SetLoading, success, SetSuccess } = useOutletContext();

  const [error, SetError] = useState(null);
  const [comment, SetComment] = useState("");

  const token = localStorage.getItem('usertoken');

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/home/posts/${postDetails.id}/comments`, {
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
        SetPost(result.updatedPost);
        SetLoading(true);
        SetSuccess(true);
      }

    } catch (err) {
      SetError(err);
    }
  };

  if (postDetails) {
    return (
      <>
        <div className={styles.postDetailsContainer}>
          <div>
            <div className={styles.form}>
              <h2 className={styles.title}>{postDetails.title}</h2>
              <p className="post-body">{postDetails.content}</p>
              <small className="post-date">{postDetails.createdAt}</small>
            </div>
            <div className={styles.formInput}>
              <form 
              onSubmit={handleSubmit}>
                  {error ? (
                  <p>A network error was encountered: {error}</p>
                ) : null}
                <div className={styles.formInputCommentContainer}>
                  <input 
                  onChange={(e) => SetComment(e.target.value)}
                  type="text" 
                  placeholder="Write a comment..." 
                  className={styles.input} />
                </div>
                <button 
                  className="comment-button"
                  type="submit"
                  >Add</button>
              </form>

            </div>
          </div>
          <div>
            <h3>Comments</h3>

            {success ? (
            <p>Comment Created Succesfully!</p>
            ) : null}

            {postDetails.comments ? (
              <div className="comments-list">
                {[...postDetails.comments].reverse().map((comment) => (
                  <div key={comment.id} className="postPreview">
                    <div>{comment.content}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>  
        </div>
      </>
    )
  }

}

export default PostDetails;
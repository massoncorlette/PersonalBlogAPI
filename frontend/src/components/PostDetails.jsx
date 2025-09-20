import { useState, useEffect } from "react";
import { useOutletContext, useParams } from 'react-router-dom';
import EditPost from './admin/EditPost';
import styles from '../styles/Createform.module.css';

 
function PostDetails() {
  const { user, SetLoading, success, SetSuccess, SetNewFetch  } = useOutletContext();

  const [postDetails, SetPost] = useState(null);
  const [error, SetError] = useState(null);
  const [comment, SetComment] = useState(null);

  const token = localStorage.getItem('usertoken');
  const {postId} = useParams();
  console.log(postId);

   useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/home/posts/${postId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        SetPost(result.post);
      } catch (error) {
        SetError(error);
      } 
    };
    fetchPost();
  },[postId, token]); 


  const handleSubmitComment = async (e) => {
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

  if (postDetails && !user.admin) {
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
              onSubmit={handleSubmitComment}>
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
          <div className="commentsContainer">
            <h3>Comments</h3>

            {success ? (
            <p>Comment Created Succesfully!</p>
            ) : null}

            {postDetails.comments ? (
              <div className="comments-list">
                {[...postDetails.comments].reverse().map((comment) => (
                  <div key={comment.id} className="commentsDiv">
                    <div>
                      <div>{comment.author.alias}</div>
                      <div>{comment.content}</div>
                    </div>
                    <div>{comment.createdAt}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>  
        </div>
      </>
    )
  } else if (postDetails) {
    return (
    <EditPost
      user={user}
      postDetails={postDetails}
      setPost={SetPost}
      setLoading={SetLoading}
      success={success}
      setSuccess={SetSuccess}
      setNewFetch={SetNewFetch}
    />
    )

  }

}

export default PostDetails;
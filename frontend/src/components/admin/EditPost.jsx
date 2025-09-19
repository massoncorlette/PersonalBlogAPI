import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styles from '../../styles/Createform.module.css';


// eslint-disable-next-line react/prop-types
function EditPost({ setLoading, success, setSuccess }) {
  const [postDetails, setCurrentPost] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(null);

  const [error, setError] = useState(null);
  const token = localStorage.getItem('usertoken');
  const postId = parseInt(useParams('postId'));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/home/${postId}`, {
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
        
        setCurrentPost(result.posts);
      } catch (error) {
        setError(error);
      } 
    };
    fetchPost();
  },[postId, token]); 
 
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/home/posts/${postDetails.id}/`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          published
        }),
      });

      if (!response.ok) {
        setError("Failed to create comment");
        return;
      }
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setCurrentPost(result.updatedPost);
        setLoading(true);
        setSuccess(true);
      }

    } catch (err) {
      setError(err);
    }
  };

  const handleToggle = () => {
   if (published) {
    setPublished(false)
  } else {
    setPublished(true)
  }};

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Edit Post</h2>
      {error ? (
      <p>A network error was encountered: {error}</p>
    ) : null}
    <div>
      {published ? (
        <button onClick={handleToggle} className={styles.button} type="submit">Make Private</button>
      ) : (
        <button onClick={handleToggle} className={styles.button} type="submit">Make Public</button>
      )}
    </div>

      <form  className={styles.form} 
      onSubmit={handleSubmitEdit}>
        <div className={styles.formInput}>
          <input
            className={styles.input}
            id="title"
            type="text"
            value={postDetails.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        <div className={styles.formTextarea}>
          <textarea
            className={styles.textarea}
            id="content"
            value={postDetails.content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post here..."
            required
          />
        </div>

        <button className={styles.button} type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
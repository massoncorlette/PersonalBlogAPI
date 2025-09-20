import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import styles from '../../styles/Createform.module.css';


// eslint-disable-next-line react/prop-types
function EditPost({ postDetails, setPost, setLoading, success, setSuccess, setNewFetch }) {
  const [title, setTitle] = useState(postDetails.title);
  const [content, setContent] = useState(postDetails.content);
  const [published, setPublished] = useState(postDetails.public);

  const [error, setError] = useState(null);
  const token = localStorage.getItem('usertoken');
  const navigate = useNavigate();


 
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
        setPost(result.updatedPost);
        setLoading(true);
        setSuccess(true);
        setNewFetch(true);
        navigate('/home')
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        <div className={styles.formTextarea}>
          <textarea
            className={styles.textarea}
            id="content"
            value={content}
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
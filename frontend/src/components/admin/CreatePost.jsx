import { useState, useEffect } from "react";
import styles from '../../styles/Createform.module.css';

// eslint-disable-next-line react/prop-types
function CreatePost({SetLoading, SetNewFetch, SetSuccess}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const [error, setError] = useState(null);
  const token = localStorage.getItem('usertoken');

  useEffect(() => {

  }, [published])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/home/posts", {
        method: "POST",
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
        setError("Failed to create post");
        return;
      }

      if (response.ok) {
        SetNewFetch(true);
        SetLoading(true);
        SetSuccess(true);
      }

    } catch (err) {
      console.error(err);
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
      <h2 className={styles.title}>Create a New Post</h2>
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
      onSubmit={handleSubmit}>
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
        <button className={styles.button} type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;

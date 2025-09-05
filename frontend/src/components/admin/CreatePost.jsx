import { useState } from "react";
import styles from '../../styles/Component.module.css';

function CreatePost({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem('usertoken');

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
        }),
      });

      if (!response.ok) {
        setError("Failed to create post");
        return;
      }

    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create a New Post</h2>
      {error ? (
      <p>A network error was encountered: {error}</p>
    ) : null}

      <form  className={styles.form} 
      onSubmit={handleSubmit}>
        <div>
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

        <div>
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

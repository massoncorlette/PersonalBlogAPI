import { useState, useOutletContext } from "react";
import styles from '../../styles/Createform.module.css';


function EditPost() {
  const { user, postDetails, SetPost, SetLoading, success, SetSuccess } = useOutletContext();
  const [title, setTitle] = useState(postDetails.title);
  const [content, setContent] = useState(postDetails.content);
  const [published, setPublished] = useState(postDetails.public);

  const [error, SetError] = useState(null);
  const token = localStorage.getItem('usertoken');

 
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/home/posts/${postDetails.id}/edit`, {
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

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Edit Post</h2>
      {error ? (
      <p>A network error was encountered: {error}</p>
    ) : null}

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

        <button className={styles.button} type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default EditPost;
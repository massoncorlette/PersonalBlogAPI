
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
{/*maybe import local styles */}
import CreatePost from "../components/admin/CreatePost";
import PostPreview from "../components/PostPreview";

function HomePage() {
  const { user, posts } = useOutletContext();

  const [loading, setLoading] = useState(true);

  //spinner upon mount with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  } ,[]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (user.admin) {
    return (
      <>
        <div>Welcome, {user.alias} as admin!</div>
        <CreatePost user={user} />
        <div id="postsPreviewContainer">
          <PostPreview posts={posts}/>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
        <div>Welcome home, <i>{user.alias}</i> </div>
        <div id="postsPreviewContainer">
          <PostPreview posts={posts}/>
        </div>
      <Footer />
    </>
  )
}

export default HomePage;
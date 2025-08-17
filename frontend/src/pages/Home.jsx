{/* import { useState, useEffect } from 'react' */}
import { useParams } from "react-router-dom";
import DefaultHomePage from "./DefaultHomePage";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import '../styles/App.css'

function Home() {
  const { name } = useParams();

  return (
    <div>
    <h1>Hello from home page!</h1>
    <p>So, how are you?</p>
    <hr />
    <h2>The page visited is here:</h2>
    {name === "pageone" ? (
      <PageOne />
    ) : name === "pagetwo" ? (
      <PageTwo />
    ) : (
      <DefaultHomePage />
    )}
  </div>
  )
}

export default Home;
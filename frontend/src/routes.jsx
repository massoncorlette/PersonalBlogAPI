import App from "./App"; 
import Home from "./pages/Home"; 
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const routes = [
  {
    path: "/", 
    element: <App />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // default render
        element:<Login/>,         
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: ":name",
        element: <Home />,
      },
    ]
  },

];

export default routes;
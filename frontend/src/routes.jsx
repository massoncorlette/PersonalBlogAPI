import App from "./App"; 
import Home from "./pages/Home"; 
import ErrorPage from "./components/ErrorPage";
import DefaultHomePage from "./pages/DefaultHomePage";

const routes = [
  {
    path: "/", 
    element: <App />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // default render
        element:<DefaultHomePage/>,         
      },
      {
        path: ":name",
        element: <Home />,
      },
    ]
  },

];

export default routes;
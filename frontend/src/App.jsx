import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* 👈 Child pages will be rendered here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;

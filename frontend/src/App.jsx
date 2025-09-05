import { Outlet } from "react-router-dom";


function App() {
  return (
    <main>
      <Outlet /> {/* 👈 Child pages will be rendered here */}
    </main>
  );
}

export default App;

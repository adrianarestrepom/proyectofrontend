import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/NavBar";
// import Footer from "./components/Footer";
// import Friends from "./components/friends/Friends.jsx";
import Groups from "./components/grupos/Grupos.jsx";
// import EditGroup from "./components/grupos/EditGroup.jsx";
// import Bills from "./components/bills/Bills.jsx";
// import Home from "./components/Home.jsx"; // Nuevo componente de inicio

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> Nueva ruta para la página de inicio */}
          {/* <Route path="/friends" element={<Friends />} /> */}
          {/* <Route path="/bills" element={<Bills />} /> */}
          <Route path="/groups" element={<Groups />} />
          {/* <Route path="/grupos/editgroup/:id" element={<EditGroup />} /> */}
        </Routes>
        {/* <Footer />  */}
      </BrowserRouter>
    </>
  );
}

export default App;

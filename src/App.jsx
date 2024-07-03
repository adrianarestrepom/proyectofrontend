import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar.jsx";
import Groups from "./components/grupos/Grupos.jsx";
import Register from "./components/Register.jsx"
import LoginInit from "./components/LoginInit.jsx"
import "./App.css";
import ProtectedRoute from "./ProtetedRoute.jsx";
import EditGroup from "./components/grupos/EditGroup.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/loguinInit" element={<LoginInit />} />
          <Route path="/" element={<Register />} />
          {/* <Route path="/friends" element={<Friends />} /> */}
          {/* <Route path="/bills" element={<Bills />} /> */}
          <Route path="/groups" element={<ProtectedRoute><Groups/></ProtectedRoute>} /> 
          <Route path="/groups/editgroup/:id" element={<EditGroup />} />
          
          {/* <Route path="/grupos/editgroup/:id" element={<EditGroup />} /> */}
        </Routes>
        {/* <Footer />  */}
      </BrowserRouter>
    </>
  );
}

export default App;


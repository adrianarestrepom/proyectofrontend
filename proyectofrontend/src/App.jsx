import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './containers/header/Header.jsx';
import GroupCard from './containers/Groupes.jsx';
import Footer from './components/Footer.jsx';
import { Nav } from './components/Nav.jsx';
import { Bills } from './containers/Bills.jsx';
import { Friends } from './containers/Friends.jsx';
import { GroupDetails } from './containers/GroupDetails.jsx'; // Importa el componente GroupDetails
import './index.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Nav />
                <Routes>
                    <Route path="/groups" element={<GroupCard data={{ id: "1", name: "Example Group", color: "blue" }} onDelete={() => { console.log("Delete function") }} />} />
                    <Route path="/bills" element={<Bills />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/group-details/:groupName" element={<GroupDetails />} /> {/* Agrega la ruta para GroupDetails */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
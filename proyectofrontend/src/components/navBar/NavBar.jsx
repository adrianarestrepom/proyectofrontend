import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [activeOpcion, setActiveOpcion] = useState("friends");

  return (
    <nav className="font-fredoka bg-coffee p-4">

      <div className="flex relative">
        <img
          className="h-10"
          src="./src/assets/Logo.svg"
          alt="Logo Aplicación"
        />
        <h2 className="text-white font-bold text-2xl ml-2 text-left">Mi Vaquita</h2>
        <NavLink to="/profile" >
          <FontAwesomeIcon icon={faCircleUser} className="text-white h-6 absolute right-0 mr-4 mt-2" />
        </NavLink>
      </div>

      <div className="flex space-x-12 justify-center text-2xl m-3">
        <NavLink
          to="/friends"
          onClick={() => setActiveOpcion("friends")}
          className={`text-white hover:text-gray-300 ${
            activeOpcion === "friends" && "font-bold"
          }`}>
          Amigos
          {activeOpcion === "friends" && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 w-0 h-0 border-t-0 border-l-12 border-r-12 border-solid border-transparent border-white"></div>}
        </NavLink>
        <NavLink
          to="/bills"
          onClick={() => setActiveOpcion("bills")}
          className={`text-white hover:text-gray-300 ${
            activeOpcion === "bills" && "font-bold"
          }`}
        >
          Gastos
          {activeOpcion === "bills" && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 w-0 h-0 border-t-0 border-l-12 border-r-12 border-solid border-transparent border-white"></div>}
        </NavLink>
        <NavLink
          to="/groups"
          onClick={() => setActiveOpcion("groups")}
          className={`text-white hover:text-gray-300 ${
            activeOpcion === "groups" && "font-bold"
          }`}
        >
          Grupos
          {activeOpcion === "groups" && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 w-0 h-0 border-t-0 border-l-12 border-r-12 border-solid border-transparent border-white"></div>}
        </NavLink>
        
      </div>
    </nav>
  );
}

export default Navbar;

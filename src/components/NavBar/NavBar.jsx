import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth.js";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="font-fredoka bg-coffee p-4 bottom-auto">
      <div className="flex items-center justify-between h-auto">
        <div className="flex items-center">
          <img
            className="h-12"
            src="./src/assets/Logo.svg"
            alt="Logo Aplicación"
          />
          <h2 className="text-white font-bold text-2xl ml-2">Mi Vaquita</h2>
        </div>
        <NavLink to="/loguin">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-white h-8"
          />
        </NavLink>
      </div>

      <div className="flex space-x-12 justify-center text-xl mt-2">
        <NavLink
          to="/friends"
          className={`relative text-white hover:text-gray-300 ${
            pathname === "/friends" && "font-bold"
          }`}
        >
          Amigos
          {pathname === "/friends" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 border-l-8 border-r-8 border-b-8 border-solid border-transparent border-b-white"></div>
          )}
        </NavLink>
        <NavLink
          to="/bills"
          className={`relative text-white hover:text-gray-300 ${
            pathname === "/bills" && "font-bold"
          }`}
        >
          Gastos
          {pathname === "/bills" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 border-l-8 border-r-8 border-b-8 border-solid border-transparent border-b-white"></div>
          )}
        </NavLink>
        <NavLink
          to="/groups"
          className={`relative text-white hover:text-gray-300 ${
            pathname === "/groups" && "font-bold"
          }`}
        >
          Grupos
          {pathname === "/groups" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 border-l-8 border-r-8 border-b-8 border-solid border-transparent border-b-white"></div>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});


  

  const validateFields = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "El email es obligatorio";
    }

    if (!username) {
      newErrors.username = "El usuario es obligatorio";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", {
        name: username,
        email: email,
        password: password,
      });
       

      setErrors({});
      console.log("Email:", email);
      console.log("Usuario:", username);
      console.log("Password:", password);
      // Aquí puedes añadir la lógica para manejar el inicio de sesión
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Puedes manejar errores adicionales aquí
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-fredoka">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
          
          <div className="flex justify-center mb-4">
            <img
              src="./src/assets/Logo decoration.svg"
              alt="Logo"
              className="w-64"
            />
          </div>
          <h1 className="flex text-coffee text-lg font-bold justify-center">Registro</h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Nombre
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Nombre"
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Correo electrónico"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              
              <button
                type="submit"
                className="bg-brown-800 text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Registrarse
              </button>
            </div>
          </form>
          <NavLink
          to="/loguinInit">            
            <button
                type="button"
                className="bg-brown-800 text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Ingresar
              </button>
          </NavLink>
          
        </div>
      </div>
    </div>
  );
};

export default Login;

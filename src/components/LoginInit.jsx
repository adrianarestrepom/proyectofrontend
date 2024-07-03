import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const LoginInit = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const validateFields = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email es obligatorio";
    }

    if (!password) {
      newErrors.password = "Contraseña es obligatoria";
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
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        window.dispatchEvent(new Event("storage"));
        navigate("/groups");
        setAuthError("");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAuthError("Email o contraseña inválidos");
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="grid bg-gray-100 justify-center font-fredoka text-coffee py-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="py-3">
          <img
            src="./src/assets/Logo decoration.svg"
            alt="Logo"
            className="w-64 py-3 mt-8"
          />
          <h1 className="my-3 text-xl font-bold justify-center text-center">
            Iniciar sesión
          </h1>
        </div>
        {authError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{authError}</span>
          </div>
        )}

        <div>
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-4 relative">
              <label
                className="block text-coffee text-sm font-bold mb-2"
                htmlFor="email"
              ></label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none border text-coffee rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Correo"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="mb-6 relative py-3">
              <label
                className="block text-coffee text-sm font-bold mb-2"
                htmlFor="password"
              ></label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none border rounded w-full py-2 px-3 pr-10 text-coffee leading-tight focus:outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Contraseña"
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee "
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 justify-between">
              <button
                type="submit"
                className="bg-coffee text-white tracking-wider font-bold py-2 px-4 rounded border-coffee border-solid"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={handleRegister}
                className="tracking-wider border-[1px] font-bold py-2 px-4 rounded border-coffee"
              >
                Registrarme
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default LoginInit;

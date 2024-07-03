import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      const response = await axios.post("http://localhost:3000/users", {
        name: username,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        setErrors({});
        setSuccessMessage("Registro exitoso");

        // Guardar el token en el sessionStorage
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);

        // Redirigir a la página de "groups"
        navigate("/groups");
      }
    } catch (error) {
      if (error.response && error.response.data.message === "El correo ya se encuentra registrado") {
        setErrors({ email: "El correo ya se encuentra registrado" });
      } else {
        console.error("Error en la solicitud:", error);
        setAuthError("Ocurrió un error durante el registro");
      }
    }
  };

  const handleLogin = () => {
    navigate("/loguinInit");
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
            Registro
          </h1>
        </div>
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">¡Éxito! </strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
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
                htmlFor="username"
              ></label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`appearance-none border text-coffee rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Nombre"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee"
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="relative py-3">
              <label
                className="block text-coffee text-sm font-bold mb-2"
                htmlFor="email"
              ></label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none border rounded w-full py-2 px-3 pr-10 text-coffee leading-tight focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Correo electrónico"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="mb-6 relative pt-3">
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
                <p className="text-red-500 text-xs italic">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 justify-between">
              <button
                type="submit"
                className="bg-coffee text-white tracking-wider font-bold py-2 px-4 rounded border-coffee border-solid"
              >
                Registrarse
              </button>

              <button
                type="button"
                onClick={handleLogin}
                className="tracking-wider border-[1px] font-bold py-2 px-4 rounded border-coffee"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;



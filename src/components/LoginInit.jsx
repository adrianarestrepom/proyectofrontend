import { useState } from "react";
import axios from 'axios';
import { useNavigate, NavLink } from "react-router-dom";

const LoginInit = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "El email es obligatorio";
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
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.userId);
        window.dispatchEvent(new Event('storage'));
        navigate('/groups');
      }

      setErrors({});
      console.log("Email:", email);
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
          <h1 className="flex text-coffee text-lg font-bold justify-center">Inicio de Sesion</h1>

          <form onSubmit={handleSubmit} className="form">
            
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
              >
                Iniciar sesión
              </button>
              <NavLink
                to="/Loguin">
                <button
                  type="button"
                  className="bg-brown-800 text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Registrarse
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginInit;

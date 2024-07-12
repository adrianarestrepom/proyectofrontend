import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function EditGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupOwner, setGroupOwner] = useState("");
  const [groupColor, setGroupColor] = useState("#ffffff");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const listColors = [
    "#ffffff",
    "#a65293",
    "#66b04c",
    "#995036",
    "#4f80a4",
    "#ffa72e",
    "#fee3e2",
    "#ff2630",
  ];

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`http://localhost:3000/groups/${id}`);
        if (response.ok) {
          const group = await response.json();
          setGroupName(group.name);
          setGroupOwner(group.owneruserid);
          setGroupColor(group.color);
        } else {
          throw new Error("Failed to fetch group data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleReturn = () => {
    navigate("/groups", { replace: true });
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupOwnerChange = (event) => {
    setGroupOwner(event.target.value);
  };

  const handleColor = (e, color) => {
    e.preventDefault();
    setGroupColor(color);
  };

  const validarCampos = () => {
    if (!groupName.trim()) {
      setValidationError("El nombre del grupo es obligatorio");
      return false;
    } else if (groupName.length > 30) {
      setValidationError("El nombre del grupo no puede superar los 30 caracteres");
      return false;
    } else {
      return true;
    }
  };

  const handleUpdateGroup = async (e) => {
    e.preventDefault(); // Evita el envío predeterminado del formulario
    if (validarCampos()) {
      try {
        const response = await axios.put(`http://localhost:3000/groups/${id}`, {
          name: groupName,
          owneruserid: groupOwner,
          color: groupColor,
        });
        if (response.status === 200) {
          // Actualización exitosa, maneja la respuesta según sea necesario
          handleReturn(); // Navega de vuelta a la página de grupos
        } else {
          throw new Error("Failed to update group");
        }
      } catch (error) {
        console.error("Error updating group:", error);
        throw new Error("Failed to update group");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 w-96">
        <div className="flex items-center mb-4">
          <button onClick={handleReturn} className="mr-2">
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500 hover:text-gray-700" />
          </button>
          <h2 className="text-2xl font-bold">Editar Grupo</h2>
        </div>
        <form onSubmit={handleUpdateGroup}>
          <input
            type="text"
            placeholder="Nombre del grupo"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <input
            type="text"
            placeholder="Dueño del Grupo"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            value={groupOwner}
            onChange={handleGroupOwnerChange}
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {listColors.map((color, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-full border-slate-300 ${groupColor === color ? 'border-4' : 'border'}`}
                style={{ backgroundColor: color }}
                onClick={(e) => handleColor(e, color)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Actualizar
          </button>
          {validationError && (
            <p className="text-red-500 font-semibold mt-2">{validationError}</p>
          )}
        </form>
      </div>
    </div>
  );
}



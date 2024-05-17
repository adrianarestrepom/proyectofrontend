import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGroup({ data, setData, newId }) {
  const [groupName, setGroupName] = useState("");
  const [groupOwner, setGroupOwner] = useState(""); 
  const [validationError, setValidationError] = useState("");
  const [open, setOpen] = useState(false);
  const [groupColor, setGroupColor] = useState("#ffffff");

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValidationError("");
    setGroupName("");
    setGroupOwner(""); 
  };

  const listColors = [
    "#a65293",
    "#66b04c",
    "#995036",
    "#4f80a4",
    "#ffffff",
    "#ffa72e",
    "#fee3e2",
    "#ff2630",
  ];

  const handleGroupOwnerChange = (event) => { 
    setGroupOwner(event.target.value);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleColor = (groupColor) => {
    setGroupColor(groupColor);
  };

  function validarCampos() {
    if (!groupName.trim() ) {
      setValidationError("Elije un nombre para continuar");
      return false;
    } else if (groupName.length > 30) {
      setValidationError("Nombre del grupo supera el máximo permitido");
      return false;
    } else {
      return true;
    }
  }

  const handleCreateGroup = async (e) => {
    if (validarCampos() === true) {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/groups", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            owneruserid: groupOwner,
            name: groupName,
            color: groupColor,
          }),
        });
        if (response.status === 201) {
          handleClose();
          const newGroup = await response.json();
          setData([...data, newGroup]);

          navigate(`/grupos/editgroup/${newId}`);
        } else if (response.status === 409) {
          setValidationError("El nombre del grupo ya Existe");
        }
      } catch (error) {
        setValidationError("Error: ", error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-yellow-500">GROUPS</h1>
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary bg-coffee"
            onClick={handleOpen}
          >
            Nuevo grupo
          </button>
        </div>
        {open && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Nuevo grupo</h2>
                <button onClick={handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateGroup}>
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
                <div className="flex flex-wrap gap-2">
                  {listColors.map((colorGroup, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: colorGroup }}
                      onClick={() => handleColor(colorGroup)}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
                >
                  Crear
                </button>
                {validationError && (
                  <p className="text-red-500 font-semibold">{validationError}</p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

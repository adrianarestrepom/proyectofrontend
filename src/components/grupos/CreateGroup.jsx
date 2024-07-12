import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGroup({ data, setData }) {
  const [groupName, setGroupName] = useState("");
  const [groupOwner, setGroupOwner] = useState(""); 
  const [validationError, setValidationError] = useState("");
  const [open, setOpen] = useState(false);
  const [groupColor, setGroupColor] = useState("#ffffff");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setGroupOwner(userId); 
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValidationError("");
    setGroupName("");
    setGroupColor("#ffffff");
  };

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

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleColor = (e, groupColor) => {
    e.preventDefault();
    setGroupColor(groupColor);
  };

  function validarCampos(e) {
    if (!groupName.trim() ) {
      e.preventDefault();
      setValidationError("Elije un nombre para continuar");
      return false;
    } else if (groupName.length > 30) {
      e.preventDefault();
      setValidationError("Nombre del grupo supera el máximo permitido");
      return false;
    } else {
      return true;
    }
  }

  const handleCreateGroup = async (e) => {
    if (validarCampos(e)) {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/groups", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            owneruserid: groupOwner,
            name: groupName,
            color: groupColor,
          }),
        });

        if (response.status === 201) {
          const newGroup = await response.json();
          setData([...data, newGroup]);
          handleClose();
          navigate("/groups", { replace: true }); // Navega a /groups y reemplaza la entrada en el historial
        } else if (response.status === 409) {
          setValidationError("El nombre del grupo ya existe");
        } else {
          const errorData = await response.json();
          setValidationError(`Error: ${errorData.message || 'Algo salió mal'}`);
        }
      } catch (error) {
        setValidationError(`Error: ${error.message || 'Algo salió mal'}`);
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center font-fredoka m-3">
          <h1 className="text-2xl font-bold text-yellow-500">GROUPS</h1>
          <button
            className="bg-coffee text-white tracking-wider font-bold p-1 rounded border-coffee border-solid px-4"
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
              <form onSubmit={(e) => handleCreateGroup(e)}>
                <input
                  type="text"
                  placeholder="Nombre del grupo"
                  className="w-full border border-gray-300 p-2 rounded mb-4"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />                
                <div className="flex flex-wrap gap-2">
                  {listColors.map((colorGroup, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-full border-slate-300 ${groupColor === colorGroup ? 'border-4':'border'} `}
                      style={{ backgroundColor: colorGroup }}
                      onClick={(e) => handleColor(e, colorGroup)}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-coffee text-white py-2 px-4 rounded hover:bg-secondary"
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
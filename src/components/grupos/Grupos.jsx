import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.jsx";
import ModalCreateGroup from "./CreateGroup.jsx";
import ModalDelete from "../ModalDelete.jsx"; // Importa el ModalDelete
import logo from "../../assets/Logo.svg";


export default function MediaCard() {
  let newId = 0;

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { data, setData, loading, error } = useFetch(
    "http://localhost:3000/groups"
  );

  if (data) {
    newId = Math.max(...data.map((item) => item.id));
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (id) => {
    if (id) {
      navigate(`/groups/editgroup/${id}`); // Asegúrate de usar comillas invertidas (`) para envolver la cadena de la ruta
    }
  };

  const handleDelete = (group) => {
    setSelectedGroup(group);
    setDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    setData(data.filter(item => item.id !== selectedGroup.id));
    setDeleteModalOpen(false);
  };

  return (
    <>
      <ModalCreateGroup data={data} setData={setData} newId={newId + 1} />
      <ModalDelete
        group={selectedGroup}
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        onSuccess={handleDeleteSuccess}
      />
      {loading && <p>Loading..... </p>}
      {error && <p>Error: {error} </p>}

      {data?.map((group) => (
        <div
          key={group.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex m-4 font-fredoka"
          
        >
          <div className="flex justify-center items-center size-32 m-4 " style={{ backgroundColor: group.color }}>
            <img
            className="size-20 min-w-32"
            src={logo}
            alt="Group Logo"
          />
          </div>
          

          <div className="flex-1 p-4">
            <h2 className=" text-slate-800 capitalize text-shadow-lg  text-2xl font-bold mb-2">
              {group.name}
            </h2>
            <p className="text-gray-600 mb-2">
              Debes: 0 {/*group.debo*/} COP
            </p>
            <p className="text-gray-600 mb-2">
              Participantes: {/*group.members*/} amig@s
            </p>
            <div className="grid gap-2 grid-cols-3"> 
              <button
              onClick={() => handleEdit(group.id)}
              className="bg-coffee text-white tracking-wider font-bold p-1 rounded border-coffee border-solid"
            >
              Editar
            </button>
            <button 
              onClick={() => handleDelete(group)}
              className="bg-coffee text-white tracking-wider font-bold p-1 rounded border-coffee border-solid"
            >
              Eliminar
            </button>
            </div>
            
          </div>
        </div>
      ))}
    </>
  );
}


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
      navigate(`/grupos/editgroup/${id}`);
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
          className="bg-white shadow-md rounded-lg overflow-hidden flex mb-4"
          style={{ backgroundColor: group.color }}
        >
          <img
            className="w-1/4 min-w-48"
            src={logo}
            alt="Group Logo"
          />

          <div className="flex-1 p-4">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              {group.name}
            </h2>
            <p className="text-gray-600 mb-2">
              Debes: 0 {/*group.debo*/} COP
            </p>
            <p className="text-gray-600 mb-2">
              Participantes: {/*group.members*/} amig@s
            </p>
            <button
              onClick={() => handleEdit(group.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Editar
            </button>
            <button 
              onClick={() => handleDelete(group)}
              className="bg-coffee hover:bg-orange-900 text-white font-bold py-2 px-4 rounded border m-1 p-5"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

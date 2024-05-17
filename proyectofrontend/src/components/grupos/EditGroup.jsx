// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useButtonDelete from "../../hooks/useButtonDelete";
// import Bills from "../bills/Bills";
// import Logo from "../../assets/img/Logo.svg";

// function EditGroup() {
//   const { id } = useParams();
//   const [data, setData] = useState("");
//   const { isDeleted, isLoading, deleteItem } = useButtonDelete(
//     `http://localhost:3000/groups/${id}`
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/groups/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch group data");
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error("Error fetching group data:", error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await deleteItem();
//     } catch (error) {
//       console.error("Error deleting group:", error);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-between mt-8 mb-4">
//         <button className="btn-primary">Nuevo Gasto</button>
//         <button className="btn-primary">Nuevo Amigo</button>
//         <button className="btn-primary">Editar Grupo</button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden flex mb-4" style={{ backgroundColor: data.color }}>
//         <img className="w-1/4 min-w-48" src={Logo} alt="Logo grupo" />
//         <div className="flex-1 p-4">
//           <h2 className="text-2xl font-bold text-yellow-500 mb-2">{data.name}</h2>
//           <p className="text-gray-600 mb-2">Participantes: 7 amig@s</p>
//           <button className="btn-primary mr-1 mt-2" onClick={() => handleDelete(data.id)} disabled={isLoading}>Eliminar</button>
//           <button className="btn-primary mr-1 mt-2">Editar</button>
//           <button className="btn-primary mt-2">Salir del grupo</button>
//         </div>
//       </div>
//       <Bills />
//     </>
//   );
// }

// export default EditGroup;



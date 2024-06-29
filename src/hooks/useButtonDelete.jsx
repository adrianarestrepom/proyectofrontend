import React, { useState } from "react";
import useButtonDelete from "./useButtonDelete"; // Asegúrate de proporcionar la ruta correcta al archivo

const ExampleComponent = () => {
  const [deleted, setDeleted] = useState(false);
  const { isDeleted, isLoading, deleteItem } = useButtonDelete(url);

  const handleDelete = async () => {
    try {
      await deleteItem();
      setDeleted(true);
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Eliminando...</p>
      ) : (
        <>
          {deleted ? (
            <p>El elemento ha sido eliminado</p>
          ) : (
            <button onClick={handleDelete}>Eliminar elemento</button>
          )}
        </>
      )}
    </div>
  );
};

export default ExampleComponent;


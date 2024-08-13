import React from 'react'
import { useMutation } from "@apollo/client";
import { DELETE_ALOJAMIENTO} from "../../../../../services/queries";
import { useNavigate  } from "react-router-dom";


const DeleteAlojamiento = ({deletBo}) => {
  
  const navigate = useNavigate();
  const idDeleteNumber =  Number(deletBo);

  const [deleteAlojamiento, { data, loading, error }] = useMutation(DELETE_ALOJAMIENTO, {
    variables: { id: idDeleteNumber }
    //refetchQueries: ["GetAlojamientos"], // Refresca los datos después de la eliminación
  });

  console.log(error)
    

  
  
  const handleDelete = async () => {
    try {
      const result = await deleteAlojamiento();
      console.log(result.data)

      if (result.data) {
        alert("Eliminado con exito", data);
        navigate(0);
      } else {
        alert("Failed to delete room");
      }
    } catch (err) {
      console.error("Error deleting room:", err);
      console.error('Detalles del error:', err.networkError ? err.networkError.result : 'Sin detalles de error de red');
    }
  };
  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Room"}
      </button>
    </div>
  )
}

export default DeleteAlojamiento

import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_ROOM } from "../../../../services/queries";

const DeleteRoom = ({ idRoom }) => {
  const [deleteRoom, { data, loading, error }] = useMutation(DELETE_ROOM, {
    variables: { id: idRoom },
    refetchQueries: ["GetAlojamientos"], // Refresca los datos después de la eliminación
  });

  const handleDelete = async () => {
    try {
      const result = await deleteRoom();
      if (result.data.deleteTypeOfHabitacion) {
        alert("Room deleted successfully", data);
      } else {
        alert("Failed to delete room");
      }
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };
  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Room"}
      </button>
    </div>
  );
};

export default DeleteRoom;

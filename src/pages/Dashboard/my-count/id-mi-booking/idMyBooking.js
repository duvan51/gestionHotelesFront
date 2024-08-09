import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Get_Reservas_ById } from "../../../../services/queries";
import { useParams } from "react-router-dom";

const IdMyBooking = () => {
  const { id } = useParams();
  const imagePrueba =
    "https://res.cloudinary.com/dlkky5xuo/image/upload/v1721988391/HotelBackend/ihiduhgox5jmou7l6r0g.jpg";

  const { loading, error, data } = useQuery(Get_Reservas_ById, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    if (error.networkError) {
      console.error("Network Error:", error.networkError);
    }
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div>
        <div>Banco de Recuerdos</div>
        <div>
          <div> Galeria fotos </div>
          <div className="d-flex justify-content-center">
            <div className="grid-fotos grid text-center pt-5">
              <div className="grid-item item1">
                <img src={imagePrueba} />
              </div>
              <div className="grid-item item2">
                <img src={imagePrueba} />
              </div>
              <div className="grid-item item3">
                <img src={imagePrueba} />
              </div>
              <div className="grid-item item4">
                <img src={imagePrueba} />
              </div>
              <div className="grid-item item5">
                <img src={imagePrueba} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {data.getReservasById.id}
    </div>
  );
};

export default IdMyBooking;

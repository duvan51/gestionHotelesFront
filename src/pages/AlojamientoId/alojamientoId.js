import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALOJAMIENTO_ID } from "../../services/queries";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Nav from 'react-bootstrap/Nav';

import CardHabitacion from "./cardHabitacions/cardHabitacion";

const AlojamientoId = () => {

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ALOJAMIENTO_ID, {
    variables: { id },
  });
  const [alojamiento, setAlojamiento] = useState(null);

  useEffect(() => {
    if (data && data.getAlojamientoById) {
      setAlojamiento(data.getAlojamientoById);
    }
  }, [data]);



  console.log(alojamiento);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!alojamiento) return <p>No se encontró el alojamiento</p>;

  return (
    <div className="alojamientoId pt-5">
      <div className="alojamientoIdHeader">
        <div>
          <Image
            src={`${alojamiento.imagePrincipal}`}
            thumbnail
            fluid
          />
        </div>
        <div>
          <div>Ubicacion</div>
          <div>comentarios</div>
        </div>
      </div>
      <div className="alojamientoIdMenuSticky mt-5">
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="#info">Informacion</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="alojamientoIdInfo pt-5" id="info">
        <div className="alojamientoIdInfoBody">
            <div className="alojamientoIdInfoBodyInfo">
                <div className="alojamientoIdInfoBodyInfoTitle"> 
                    <h3>
                        {alojamiento.title}
                    </h3>
                    <div>⭐⭐⭐</div>
                </div>
                <div className="alojamientoIdInfoBodyInfoBody">
                    <p>{alojamiento.description}</p>
                </div>
            </div>
            <div className="alojamientoIdInfoBodyServicios">

            </div>
        </div>
        <div className="alojamientoIdInfoHabitacions">
            <div className="alojamientoIdInfoHabitacionsTitle">
                <h3>Habitaciones</h3>
            </div>
            <div className="alojamientoIdInfoHabitacionsCards">
                {alojamiento.typeOfHabitacion.map(x =>(
                    <CardHabitacion data={x} key={x.id} />
                ))}
            </div>
        </div>
        <div className="alojamientoIdInfoOpiniones">
            <div>
                calificacion
            </div>
            <div>
                opiniones
            </div>
        </div>
        <div  className="alojamientoIdInfoServices">
            <div className="alojamientoIdInfoServicesTitle">
            </div>
            <div className="alojamientoIdInfoServicesPopulars">
            </div>
            <div className="alojamientoIdInfoServicesAll">
            </div>
        </div>
        <div className="alojamientoIdInfoServices">

        </div>
      </div>
    </div>
  );
};

export default AlojamientoId;

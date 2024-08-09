import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeleteBooking from './cardDeleteBooking.js';
import moment from "moment";


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { GET_ALOJAMIENTO_ID, } from "../../../../services/queries";
import { useQuery } from "@apollo/client";

import { MdDeleteSweep } from "react-icons/md";
import { FaCodeCompare } from "react-icons/fa6";

const CardAlojamientos = ({ info, idAlojamiento }) => {
  const navigate = useNavigate();
  const idAlojamientos = info.alojamientoId


  const { loading, error, data } = useQuery(GET_ALOJAMIENTO_ID, {
    variables: { id: idAlojamientos },
  });


  const handleCardClick = (id) => {
    // navigate(`/views/${id}`)
    console.log("Hell", id);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error--: {error.message}</p>;
 const fechaEs = moment(`${info.birthCheckout }`, "DDMMYYYY").fromNow();

 let statusStyle = {};
 if (info.status === 'procesando') {
  statusStyle = { backgroundColor: '#0b5ed7', color: 'black' };
} else if (info.status === 'completado') {
  statusStyle = { backgroundColor: '#157347', color: 'black' };
} else if (info.status === 'espera') {
  statusStyle = { backgroundColor: '#fbc201', color: 'black' };
} else if (info.status === 'cancelado') {
  statusStyle = { backgroundColor: '#c32f3d', color: 'black' };
} else {
  statusStyle = { backgroundColor: '#ffffff', color: 'black' };
}



  return (
    <div className= {`cardsBooking `}>
      <Card >
        <Card.Header  style={statusStyle}>{info.status}</Card.Header>
        <Row className="cardRow">
          <Col className="cardImage">
            <Image
              src={`${data.getAlojamientoById.imagePrincipal}`}
              thumbnail
              fluid
            />
          </Col>
          <Col className="cardInfo">
            <Card.Body>
              <Card.Title>
                Reserva en el hotel {data.getAlojamientoById.title}
              </Card.Title>
              <Card.Text>{data.getAlojamientoById.description}</Card.Text>
              <Card.Text>$ {info.paymentTotal}</Card.Text>
              {
                info.status=== "procesando" ? (
                  <div> 
                  <button className="btn">
                      agregar recuerdos
                  </button>
                </div>

                ): info.status === "completado" ?(
                  <div> 
                  <button className="btn">
                      ver Recuerdos
                  </button>
                </div>
                ) : (
                  <></>
                )
              }
             
            </Card.Body>
          </Col>
          <Col className="cardActions">
            <div className="d-flex align-items-center">
              <div>
                <span className="text-secondary">{fechaEs}</span>
              </div>
              <Button
                variant="primary"
                onClick={() => handleCardClick(info.id)}
              >
                Reservas de nuevo
              </Button>
            </div>
            <div>
              <Button
                variant="primary"
                onClick={() => handleCardClick(info.id)}
              >
                <MdDeleteSweep />
              </Button>
              <Button
                variant="primary"
                onClick={() => handleCardClick(info.id)}
              >
                <FaCodeCompare />
              </Button>
            </div>
          </Col>
        </Row>
        <Card.Footer>
          <div>
            <div>
              {`
            ${data.getAlojamientoById.pais} - 
            ${data.getAlojamientoById.departamento}
            `}
            </div>
            <div>
              <div>
              {`
            ${info.birthCheckout} - 
            ${info.birthCheking}
            `}
             </div>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardAlojamientos;

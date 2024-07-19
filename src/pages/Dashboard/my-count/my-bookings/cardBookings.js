import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeleteBooking from './cardDeleteBooking.js';


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
  const URLIMAGE = `http://localhost:8080/uploads`;

  const { loading, error, data } = useQuery(GET_ALOJAMIENTO_ID, {
    variables: { id: idAlojamiento },
  });

  const handleCardClick = (id) => {
    // navigate(`/views/${id}`)
    console.log("Hell", id);
  };
 // console.log("data=>", data);
 // console.log("info=>", info);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="cardsBooking">
      <Card>
        <Card.Header>{info.title}</Card.Header>
        <Row className="cardRow">
          <Col className="cardImage">
            <Image
              src={`${URLIMAGE}${data.getAlojamientoById.imagePrincipal}`}
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
            </Card.Body>
          </Col>
          <Col className="cardActions">
            <div>
              <div>
                <span>create hace 15 dias</span>
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

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';



import Beneficios from "../../../components/beneficios/beneficioId.js";

const CardAlojamientos = ({info}) => {

  const[beneficios , setBeneficios] = useState([])

  const navigate = useNavigate();
  

  const handleCardClick = (id) => {
    navigate(`/views/${id}`)
};

  const x = info&&(info.typeOfHabitacion[0])
  console.log(x)

  return (

    <div className='cards'>
        <Card>
            <Card.Header>
              <div className='cardsHeader'>
              <div>
                 {info.title}
              </div>
              <div>
                {`${info.departamento} - ${info.ciudad}`}
              </div>

              </div>
              
              
            </Card.Header>
            <Row className='cardRows'>
                <Col className='cardImage'>
                  <Image src={`${info.imagePrincipal}`} thumbnail fluid/>
                </Col>
                <Col className='d-flex flex-column' >
                <Card.Body>
                    <Card.Title>{info.title}</Card.Title>
                    <Card.Text>
                    {info.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleCardClick(info.id)}>Conocer mas</Button>
                </Card.Body>
                <div className="cardBeneficios" >
                   <Beneficios databeneficio={x.beneficios}  />
                </div>
                
                </Col>
            </Row>
        </Card>
    </div>
  )

}

export default CardAlojamientos
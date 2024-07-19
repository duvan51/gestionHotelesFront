import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

const CardAlojamientos = ({info}) => {
  const navigate = useNavigate();
  const URLIMAGE = `http://localhost:8080/uploads`;

  const handleCardClick = (id) => {
    navigate(`/views/${id}`)
};
console.log(info)

  return (
    <div className='cards'>
        <Card>
            <Card.Header>
              <div>
                 {info.title}
              </div>
              <div>
                {`${info.departamento} - ${info.ciudad}`}
              </div>
              
            </Card.Header>
            <Row className='cardRow'>
                <Col className='cardImage'>
                  <Image src={`${URLIMAGE}${info.imagePrincipal}`} thumbnail fluid/>
                </Col>
                <Col >
                <Card.Body>
                    <Card.Title>{info.title}</Card.Title>
                    <Card.Text>
                    {info.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleCardClick(info.id)}>Conocer mas</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    </div>
  )

}

export default CardAlojamientos
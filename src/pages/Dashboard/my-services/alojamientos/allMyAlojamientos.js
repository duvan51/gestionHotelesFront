import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_uniq } from "../../../../services/queries";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import DeleteAlojamiento from "./components.js/deleteAlojamiento";

const AllMyAlojamientos = () => {
  const navigate = useNavigate();


  const { loading, error, data } = useQuery(GET_USERS_uniq);
  const [alojamientos, setAlojamientos] = useState(null);
  

  useEffect(() => {
    if (data && data.getUser) {
      
      setAlojamientos(data.getUser.Alojamientos);
    }
  }, [data]);

 // console.log(alojamientos)
 const handleCardClick = (id) => {
  navigate(`/dashboard/all&alojamientos/${id}`)
 };

 console.log(loading, error)


  return (
    <div>
      <div>
        <button>
          <Link to="/dashboard/add&alojamientos">Agregar Alojamiento</Link>
        </button>
      </div>
      <h1>Mis Alojamientos</h1>
      <div>
        <Row xs={1} md={2} className="g-4">
          {alojamientos?.map((x) => (
            //console.log(x),
            <Col key={x.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${x.imagePrincipal}`}
                />

                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>{x.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                  <small className="text-muted">
                    <DeleteAlojamiento deletBo={x.id} />
                    <button >Edit</button>
                    <button  onClick={() => handleCardClick(x.id) }>View</button>
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllMyAlojamientos;

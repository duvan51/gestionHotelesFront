import React, {useState, useEffect, useContext} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Swal from 'sweetalert2'


import { CartContext } from "../../../context/carContext";

const CardHabitacion = ({ data }) => {
  const { cart, dispatch } = useContext(CartContext);
  const user = localStorage.getItem("UserName")
  


  const addItemToCart = (item) => {
    //console.log("item--",item)
    if(!user){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      localStorage.removeItem("cart");
    }
    dispatch({ type: 'ADD_ITEM', payload: item });
    
  };

  

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>{data.nameOfHabitacion}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#"><button onClick={()=> addItemToCart({id: data.id, name: data.nameOfHabitacion, price: data.price, numbersCama:data.numbersCama, numberHabitacions : data.numberHabitacions, alojamientoId:data.alojamientoId })}>Hacer Reserva</button></Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardHabitacion;

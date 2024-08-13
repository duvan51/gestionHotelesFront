import React, {useState, useEffect, useContext} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Swal from 'sweetalert2'


import { CartContext } from "../../../context/carContext";
import Databeneficio from '../../../components/beneficios/beneficioId'

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
      <Card style={{ width: "18rem", height:"20rem"}}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Body>
          <Card.Title>{data.nameOfHabitacion}</Card.Title>
          <Card.Text>
            {data.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <div className="d-flex ">
            <Databeneficio databeneficio={data.beneficios}/>
          </div>
          <ListGroup.Item>
              {data.price}
          </ListGroup.Item>
          <ListGroup.Item>
             N {data.numbersCama}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <div className="d-flex justify-content-end">
            <Card.Link href="#"><button type="button" className="btn btn-success" onClick={()=> addItemToCart({id: data.id, name: data.nameOfHabitacion, price: data.price, numbersCama:data.numbersCama, numberHabitacions : data.numberHabitacions, alojamientoId:data.alojamientoId })}>Reservar</button></Card.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardHabitacion;

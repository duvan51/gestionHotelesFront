import React,{useContext} from "react";
import {
  Add_Reserva,
  Add_Reserva_Alojamiento,
} from "../../../../services/queries";
import { useMutation} from "@apollo/client";
import { CartContext } from "../../../../context/carContext";
import { useNavigate, Link } from "react-router-dom";


const AddReserva = ({
  dataAlojamientosHabitacion,
  dataAlojamiento,
  diasReserva,
  payment,
  cheking,
  checkout,
}) => {
  const [AddReservas, { data: addData, loading: addLoading, error: addError }] =
    useMutation(Add_Reserva);
  const [
    AddReservaAlojamiento,
    { data: RAaddData, loading: RAaddLoading, error: RAaddError },
  ] = useMutation(Add_Reserva_Alojamiento);

  const { dispatch, cart } = useContext(CartContext);
  const navigate = useNavigate();
  


  //!este es dataalojamiento
  //console.log(dataAlojamiento)
  const idUser = localStorage.getItem("id");

  const createReservaComplet = async () => {
    try {
      if (
        dataAlojamiento &&
        payment &&
        cheking &&
        checkout &&
        diasReserva &&
        idUser
      ) {
        const response = await AddReservas({
          variables: {
            payment: payment,
            birthCheking: cheking,
            birthCheckout: checkout,
            daysAlojamientos: diasReserva,
            paymentTotal: payment,
            userId: Number(idUser),
            alojamientoId: Number(dataAlojamiento.id),
            status: "procesando",
          },
        });
        const reservaId = Number(response.data.createReserva.id);

        //console.log("Reserva created:", reservaId);

        // console.log('dataAlojamiento si existe',dataAlojamiento)
        //entradas de las reservaAlojamiento
        if (dataAlojamiento) {
          const reservaAlojamientoPromises = dataAlojamientosHabitacion.map(
            (x) =>
              AddReservaAlojamiento({
                variables: {
                  reservaId: reservaId,
                  id_habitacion: Number(x.alojamientoId),
                  price: (Number(x.price) * diasReserva).toString(),
                  daysReserva: Number(diasReserva),
                  alojamientoId: dataAlojamiento.id,
                },
              })
          );
           await Promise.all(reservaAlojamientoPromises);

          // console.log("ReservaAlojamientos created:", results);
        } else {
          console.log("data no ha cargado ...");
          return null
        }
      //aqui es para retornar el id de la reserva
      return reservaId;
     
      } else {
        console.log("hay alguna data que no esta cargando...");
        return null;
      }
    } catch (error) {
      if (error.networkError) {
        console.log("error de red => ", error.networkError.message);
      } else if (error.graphQLErrors) {
        error.graphQLErrors.forEach((graphQLErrors) => {
          console.error("error de graphl => ", graphQLErrors.message);
        });
      } else {
        console.error("Error desconocido:", error.message);
      }
      return null;
    }
   
  };

  const valueDelete = (x) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: x } });
  };

  const handleAddReservaClick = async () => {
    const reservaId = await createReservaComplet();
    if(reservaId){
      alert(reservaId)

      dataAlojamientosHabitacion.forEach(item=>{
        valueDelete(item.id)
      })

      navigate('/dashboard/my-bookings')

      
      
    } else{
      console.log('no se pudo completar la reserrva')
    }
  }

  


  

  //console.log('habitacionAlojamientos =>', dataAlojamientosHabitacion)

  //console.log('Alojamientos =>', dataAlojamiento)

  //console.log('diasReserva=>', diasReserva )

  return <button onClick={handleAddReservaClick}>asddReserva</button>;
};

export default AddReserva;

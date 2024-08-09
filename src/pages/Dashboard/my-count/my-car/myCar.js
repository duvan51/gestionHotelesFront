import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { CartContext } from "../../../../context/carContext";
import { BiArrowBack } from "react-icons/bi";

import { GET_ALOJAMIENTO_ID} from "../../../../services/queries";
import { useQuery } from "@apollo/client";

import ButtonPaypal from "../../../../components/paypal/ButtonPaypal";
import AddReserva from "./addReserva";
import { RiDeleteBin5Line, RiApps2AddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Calendar from "./calendar";
import InputCalendary from "./inputCalendary";

import moment from "moment";

const MyCar = () => {
  const navigate = useNavigate();
  const { dispatch, cart } = useContext(CartContext);

  const [selectedDate1, setSelectedDate1] = useState(0);
  const [selectedDate2, setSelectedDate2] = useState("");


  const [alojamiento, setAlojamiento] = useState(null);

  const [tot, setT] = useState();
  //tarigo el hotel de mi seleccion cart

  //aqui voy a traer las res

 

  // console.log(cart)

  const id = cart.length > 0 ? cart[0].alojamientoId : null;

  const { loading, error, data } = useQuery(GET_ALOJAMIENTO_ID, {
    variables: { id },
  });
  useEffect(() => {
    if (data && data.getAlojamientoById) {
      setAlojamiento(data.getAlojamientoById);
    }
  }, [data]);

 // console.log(data)



  //navegar al my-bookings
  const navigateMybookings= async ()=>{
    navigate('/dashboard/my-bookings')
  }

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <>
      <div className="d-flex justify-content-between">
          <div>
            <button type="button" className="btn btn-link btn-lg" onClick={navigateMybookings}>
              <BiArrowBack />
            </button>
          </div>
         <p>Error: {error.message}</p>
      </div>
    </>
  )

  const handleDateChange1 = (event) => {
    setSelectedDate1(event.target.value);
  };
  const handleDateChange2 = (event) => {
    setSelectedDate2(event.target.value);
  };

  //! calculamos la diferencia en dias
  const start = moment(selectedDate1);
  const end = moment(selectedDate2);
  const diff = end.diff(start, "days");




  var xTotal = 0;
  var suma = cart.forEach((element) => {
    const numb = diff * Number(element.price);
    xTotal += numb;
  });

  const dayctual = moment().format("DD/MM/yy");

  //
  const irLink = () => {
    const link = `/views/${id}`;
    navigate(link);
  };


  //console.log(cart)

  return (
    <div>
      <div>Tu reserva</div>
      {alojamiento ? (
        <div>
          <div>
            <h1>{alojamiento.title}</h1>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <Table responsive="sm" striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Habitacion</th>
              <th>Numero Habitacion</th>
              <th>Precio</th>
              <th>birthCheking</th>
              <th>birthCheckout</th>
              <th>dias</th>
              <th>Precio Total</th>
              <th>Botton</th>
            </tr>
          </thead>
          <tbody>
            {cart ? (
              cart.map((x) => (
                ("cart====>" ,x),

                <tr key={x.id}>
                  <td className="z-3">
                   
                  </td>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.numberHabitacions}</td>
                  <td>$ {x.price}</td>
                  <td>
                    <InputCalendary
                      data={alojamiento}
                      idHabitacion={x.id}
                      start={start} 
                      ends={end}
                    />
                    <input
                      type="date"
                      value={selectedDate1}
                      onChange={handleDateChange1}
                      min={dayctual}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={selectedDate2}
                      onChange={handleDateChange2}
                    />
                  </td>
                  <td>{diff} dias</td>
                  <td className="fw-bold">$ {diff * Number(x.price)} </td>
                  <td className="d-flex justify-content-center">
                    <button type="button" className="btn btn-danger">
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Cargando...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex flex-row mb-2 justify-content-between">
          <div className="d-flex gap-2">
            <div>TOTAL :</div>
            <div className="fw-bold">$ {xTotal}</div>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={irLink}
            >
              <RiApps2AddFill />
            </button>
          </div>
        </div>
      </div>


      <div>
        <AddReserva 
          dataAlojamientosHabitacion={cart} 
          dataAlojamiento={alojamiento} 
          diasReserva={diff}  
          payment={xTotal}
          cheking={start.format('DD/MM/yy')}
          checkout={end.format('DD/MM/yy')}
        />
      </div>
      <div className="d-flex">
        <Calendar 
          start={start} 
          ends={end} 
        />
      </div>
      <div className="pt-5 d-flex">
        <ButtonPaypal data={xTotal} />
      </div>
    </div>
  );
};

export default MyCar;

import moment from "moment";
import React, { useState, useContext, useEffect} from "react";
import DatePicker from "react-datepicker";
import {  GetReservaAlojamiento, GetReservaAlojamientoById  } from "../../../../services/queries";
import { useQuery } from "@apollo/client";
import { CartContext } from "../../../../context/carContext";
import "react-datepicker/dist/react-datepicker.css";

const InputCalendary = ({idHabitacion}) => {
  const [startDate, setStartDate] = useState(new Date());

  const { loading, error, data } = useQuery(  GetReservaAlojamiento  );
  const [fechas, setFechas] = useState([''])

  const { dispatch, cart } = useContext(CartContext);
  
  const id= "5"

  const { loading:x, error:y, data:z } = useQuery(GetReservaAlojamientoById, {
    variables: { id },
  });

  useEffect(() => {
    if (z) {
      //setAlojamiento(data.getAlojamientoById);
      setFechas(z.getReservaAlojamientoById)
    }
  }, [z]);
 // console.log("fechas",fechas)



  console.log(`=>number habitacion ${id} =>`,z)
  //console.log("data = > ",data)


  // Generar las fechas entre las fechas inicial y final
  const generateDates = (start, end) => {
    const dates = [];
    let currentDate = moment(start);
    const endDate = moment(end);

    while (currentDate <= endDate) {
      dates.push(currentDate.clone().toDate()); // Convertir a objeto Date
      currentDate = currentDate.add(1, 'days');
    }

    return dates;
  };

  const dates = generateDates("2024-08-04", "2024-08-06");

  // Función para deshabilitar fechas específicas
  const isDisabled = (date, dates) => {
    return dates.some(d => d.getTime() === date.getTime());
  };

  const isDisabledWrapper = date => {
    return !isDisabled(date, dates);
  };



  if (x) return <p>Loading...</p>;
  if (y) return <p>error {y.message}</p>;

  return (
    <DatePicker 
      selected={startDate} 
      onChange={(date) => setStartDate(date)} 
      dateFormat="yyyy-MM-dd"
      filterDate={isDisabledWrapper} // Filtra las fechas deshabilitadas
    />
  );
};

export default InputCalendary;
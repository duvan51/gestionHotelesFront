import React,{useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';



const localizer = momentLocalizer(moment);

const Calendary = (start , ends, data) => {

    if (!start || !ends) {
        console.log("Faltan las fechas de inicio o fin");
        return <p>Por favor, proporciona fechas de inicio y fin válidas.</p>;
      }



 
    const startDate = moment(start.start);
    const endDate= moment(start.ends)


    //  console.log("start date", startDate);
    //  console.log("finally", endDate);
    // console.log("dta==>" , start);

   // const xStart=  start.start._i

    const myEventsList = [
        {
          title: 'Reserva',
          start: startDate.toDate(), // Meses en JS son 0-indexados
          end: endDate.toDate(),
        },
      ];


    // console.log("calendario dinamico",myEventsList)

  return (
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  )
}

export default Calendary
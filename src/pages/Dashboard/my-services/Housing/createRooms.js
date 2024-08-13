import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import * as formik from 'formik';
import * as yup from 'yup';

import { useMutation } from '@apollo/client';
import { Add_Room } from '../../../../services/queries';

import Beneficios from "../../../../components/beneficios/beneficios";

const CreateRooms = ({idHotel}) => {
  const [AddRoom, { data, loading, error }] = useMutation(Add_Room);
  const [listBeneficios, setListBeneficios] = useState([]);
  const [beneficiosData, setBeneficiosData] = useState([]);

  const { Formik } = formik;

  const initialValues = {
    numberHabitacion: 0,
    nameOfHabitacion: '',
    numbersCama: '',
    price: '',
  };


  
  const sendDataServer = async (values) => {
    console.log(values);
    // Llamar a la mutación de GraphQL aquí
    try {
      const response = await AddRoom({
        variables: {
          numberHabitacion: values.numberHabitacion,
          nameOfHabitacion: values.nameOfHabitacion,
          numbersCama: values.numbersCama,
          price: values.price,
          alojamientoId: idHotel, // Ejemplo de alojamientoId, ajusta según sea necesario
          beneficiosId:listBeneficios
        },
      });

      console.log("log",response)
       if(data){
        console.log(data)
        // navigate('/home')
       }
    
      
    } catch (err) {
      console.error('Error al enviar los datos:', err.message);
      console.error('Detalles del error:', err.networkError ? err.networkError.result : 'Sin detalles de error de red');
    }
  };


  // Actualiza listBeneficios cada vez que beneficiosData cambia
  useEffect(() => {
    if(beneficiosData){
      setListBeneficios(
        beneficiosData.map(x => parseInt(x.trim()))
      );
    }
    
  }, [beneficiosData]);

 
  

  return (
    <div>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Agregar Habitación</Accordion.Header>
          <Accordion.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={sendDataServer}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="numberHabitacion"
                    label="Numero de habitación"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Numero de habitación"
                      name="numberHabitacion"
                      onChange={handleChange}
                      value={values.numberHabitacion}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="nameOfHabitacion"
                    label="Nombre de habitación"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Nombre de habitación"
                      name="nameOfHabitacion"
                      onChange={handleChange}
                      value={values.nameOfHabitacion}
                    />
                    
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="numbersCama"
                    label="Numero de camas"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Numero de camas"
                      name="numbersCama"
                      onChange={handleChange}
                      value={values.numbersCama}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="price" label="Precio" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Precio"
                      name="price"
                      onChange={handleChange}
                      value={values.price}
                    />
                  </FloatingLabel>
                  <div>
                    <Beneficios databeneficios={(data) => setBeneficiosData(data)} />
                  </div>

                  <Button type="submit">Agregar Habitación</Button>
                </Form>
              )}
            </Formik>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default CreateRooms;
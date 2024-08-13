import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

//import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { Add_User } from '../../services/queries';




function RegisterUserForm()  {
  //const navigate = useNavigate();
 const [ addUser, { data, loading, error }] = useMutation(Add_User);


  
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const { Formik } = formik;
  

  const schema = yup.object().shape({
    Name: yup.string().required(),
    lastName: yup.string().required(),
    dateBirth: yup.string().required(),
    identificacion: yup.string().required(),
    email: yup.string().required()
  });

  const sendDataServer = async (values) =>{
    //console.log('Datos del formulario:', values);  // <-- Log the form values

    try {
      const response =  await  addUser({
        variables:{
          name:values.Name,
          lastName:values.lastName,
          email:values.email,
          dateBirth:values.dateBirth,
          identificacion:values.identificacion,   
          historySearch: "asdasdsad",
          photo:"https://dthezntil550i.cloudfront.net/f4/latest/f41908291942413280009640715/1280_960/1b2d9510-d66d-43a2-971a-cfcbb600e7fe.png",
          password: values.identificacion

        }
           
       });
       
       console.log(response)
       if(data){
        console.log(data)
        // navigate('/home')
       }

     
      
    } catch (err) {
      console.error('Error al enviar los datos:', err.message);
      console.error('Detalles del error:', err.networkError ? err.networkError.result : 'Sin detalles de error de red');
     }
    
  }



  return (
    <Formik
      validationSchema={schema}
      onSubmit={sendDataServer}
      initialValues={{
        Name: 'Mark',
        lastName: 'Otto',
        dateBirth: '',
        identificacion: '',
        email: ''
   
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={values.Name}
                onChange={handleChange}
                isValid={touched.Name && !errors.Name}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="date"
                  placeholder="DateBirth"
                  aria-describedby="inputGroupPrepend"
                  name="dateBirth"
                  value={values.dateBirth}
                  onChange={handleChange}
                  isInvalid={!!errors.dateBirth}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dateBirth}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Identificacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="C.C"
                name="identificacion"
                value={values.identificacion}
                onChange={handleChange}
                isInvalid={!!errors.identificacion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.identificacion}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik04">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@gmail"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" >Enviar</Button>
        </Form>
      )}
    </Formik>
  );
}



export default RegisterUserForm
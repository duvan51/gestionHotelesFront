import React, {useState} from 'react';
import { useQuery , useMutation} from '@apollo/client';
import { GET_USERS_ALOJAMIENTOS, Add_Beneficios } from '../services/queries';

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Beneficios from '../components/beneficios/beneficios';


const Users = () => {
  const { loading, error, data } = useQuery( GET_USERS_ALOJAMIENTOS );


  const [ addBeneficios, { data:datas, loading:loadings, error:errors}] = useMutation(Add_Beneficios);

  const [ formData, setFormData] = useState({
    title : "",
    description: "",
    imagenPrincipal: "",
    iconoPrincipal: ""
  })

  const [ image, setImage] =useState(null)





  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }
  const handleImageChange = (e)=>{
    setImage(e.target.files[0])
  }





  const handleSubmit =async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario
    try {

      const response = await addBeneficios({
        variables: {
          title: formData.title,
          description: formData.description,
          imagePrincipal: formData.imagenPrincipal,
          iconoPrincipal: formData.iconoPrincipal
        },
      });

      console.log("log",response)
       if(datas){
        console.log(datas)
        // navigate('/home')
       }
      
    } catch (err) {
      console.error('Error al enviar los datos:', err.message);
      console.error('Detalles del error:', err.networkError ? err.networkError.result : 'Sin detalles de error de red');
    }

    console.log('Email:', formData.title);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
  };





  return (
    <div className='pl-8'>
      <div className='CardsInfo' >
        <div className='div1'>
            Total Alojamientos
        </div>

        <div className='div2'>
          Total de Reservas
        </div>

        <div className='div3'>
          Total de Usuarios
        </div>

        <div className='div4'>
          Total de Usuarios
        </div>
      </div>

      <div className='contenido ps-5 pe-5 '>
      <Accordion defaultActiveKey="0" >
        {data.getUsers.map(user => (
          <Accordion.Item eventKey= {user.id} key={user.id} >
            <Accordion.Header> <img src={user.photo} width="30" height="30"/> <span className='text-uppercase fw-bold ps-2'> {user.Name} {user.lastName} </span> </Accordion.Header>
              <Accordion.Body>
              <Table >
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Identificacion</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.Name}</td>
                        <td>{user.email}</td>
                        <td>{user.identificacion}</td>
                    </tr>
                    </tbody>
                </Table>

                <div className='h4 pb-2 mb-4 text-danger border-bottom border-dark '></div>

                <Table >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.Alojamientos.map(x =>(
                        <tr key={x.id}>
                          <td>{x.id}</td>
                          <td>{x.title}</td>
                        </tr>
                      ))} 
                      <div>
                        <></>
                      </div> 
                  </tbody>
                </Table>
              </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      </div>




      <div className='createBeneficios'>
      <Form onSubmit={handleSubmit} >
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Nombre</Form.Label>
          <Form.Control 
            id="title" 
            name="title" 
            placeholder="Nombre del beneficio" 
            value= {formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Decripcion</Form.Label>
          <Form.Control 
            id="description" 
            name="description"
            placeholder="Descripcion" 
            value= {formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Imagen</Form.Label>
          <Form.Control 
            id="imagenPrincipal" 
            name="imagenPrincipal"
            placeholder="Imagen principal" 
            onChange={handleImageChange}
            type='file'
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">icono Principal</Form.Label>
          <Form.Control 
            id="iconoPrincipal" 
            name="iconoPrincipal"
            placeholder="Imagen principal" 
            value= {formData.iconoPrincipal}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </fieldset>
    </Form>
      </div>

      
      <div className='beneficios'>
        <Beneficios />
      </div>

      
    </div>
  );
};

export default Users;


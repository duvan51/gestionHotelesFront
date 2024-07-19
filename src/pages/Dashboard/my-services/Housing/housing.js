import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USERS_uniq} from '../../../../services/queries';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import ButtonDeleteRoom from './deleteRoom.js'
import CreateRoom from './createRooms.js'


const Housing = () => {

  const [user, setUser] = useState(null)
  const { loading, error, data } = useQuery( GET_USERS_uniq );
  const [activeAlojamiento, setActiveAlojamiento] = useState(null); // Estado para el key activo
  
  
  useEffect(() => {
    if(data && data.getUser){
        setUser(data.getUser)
    }
  }, [data]); // e<- add empty brackets here


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const Alojamientos = user?.Alojamientos
 // const TypeOfHabitacion = Alojamientos?.typeOfHabitacion
 

  const renderContext = ()=>{
    if(!Alojamientos){
      return <div>Inicia sesion</div>
    }
    if (activeAlojamiento === null && Alojamientos.length > 0) {
      setActiveAlojamiento(Alojamientos[0].id);
    }
    const handleSelect = (selectedKey) => {
      setActiveAlojamiento(selectedKey);
    };
    return (
      <Tab.Container id="left-tabs-example" activeKey={activeAlojamiento} onSelect={handleSelect}>
      <Row className='hotelsReservas'>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              {Alojamientos.map((product)=>(
                <Nav.Link eventKey={product.id} key={product.id} >{product.title}</Nav.Link>
              ))}
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <div>
            <div>ingresos</div>
            <div>Reservas</div>
            <div>Habitaciones</div>
          </div>
          <Tab.Content>
          {Alojamientos.map((product)=>(
                <Tab.Pane eventKey={product.id} key={product.id} >
                  <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre de Habitacion</th>
                    <th>Numero de Habitacion</th>
                    <th>Numero de Camas</th>
                    <th>Precio</th> 
                    <th>edit</th>
                  </tr>
                </thead>
                <tbody>
                    {(product.typeOfHabitacion).map((x) => (
                     
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td > {x.nameOfHabitacion}</td>
                        <td > {x.numberHabitacions}</td>
                        <td > {x.numbersCama}</td>
                        <td > {x.price}</td>
                        <td >
                          
                          <ButtonDeleteRoom idRoom={x.id}/>
                          <button>🟥</button>

                        </td>
                      </tr>
                      ))}
                      
                </tbody>
                
              </Table>
                <CreateRoom idHotel={activeAlojamiento} />
                </Tab.Pane>
                
              ))}
            <Tab.Pane eventKey="first">
            </Tab.Pane>
            <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    );
  };


  return (
    <>
      <div>
        {renderContext()}
      </div>
    </>
    
  )
}




export default Housing
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS_ALOJAMIENTOS } from '../services/queries';

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';


const Users = () => {
  const { loading, error, data } = useQuery( GET_USERS_ALOJAMIENTOS );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
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

      <Accordion defaultActiveKey="0">
        {data.getUsers.map(user => (
          <Accordion.Item eventKey= {user.id}>
            <Accordion.Header>{user.Name}</Accordion.Header>
              <Accordion.Body>
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
                        <button onClick={console.log("agregar usauario para =", user.Name)}>
                           
                        </button>
                      </div> 
                  </tbody>
                </Table>
              </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Users;


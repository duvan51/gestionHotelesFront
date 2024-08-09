import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import { GetBeneficios } from '../../services/queries';



const  Beneficios = () => {

  const { loading, error, data } = useQuery( GetBeneficios );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;



  

  return (
    <div className='d-flex gap-2 pt-5 pb-5'>
      {
       data.getBeneficios.map((x)=>
       (
          <div key={x.id} className='border border-white rounded'>
             <div>
                {x.title}
             </div>
             <div>
                {x.description}
             </div>
          </div>
       ))
      }
    </div>
  )
}

export default  Beneficios
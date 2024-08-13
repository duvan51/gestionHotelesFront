import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { GetBeneficios } from '../../services/queries';





const Beneficios = ({ databeneficios }) => {

  const { loading, error, data } = useQuery( GetBeneficios );
  const[beneficiosData, setBeneficiosData] = useState([])

 


  const handleClick = (id)=>{
    if(beneficiosData.includes(id)){
      setBeneficiosData(beneficiosData.filter((x) => x !==id))
    }else{
      setBeneficiosData([...beneficiosData, id]);  
    }
  }

  useEffect(() => {
    databeneficios(beneficiosData); // Solo se llama cuando beneficiosData cambia
  }, [beneficiosData, databeneficios]);


  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  

  return (
    <div className='d-flex gap-2 pt-5 pb-5 '>
      {
       data.getBeneficios.map((x)=>
       (
          <div key={x.id} className='border border-white rounded tarjetBeneficios' type='button' onClick={()=>  handleClick(x.id)}
          style={{ backgroundColor: beneficiosData.includes(x.id) ? '#2e334e' : '#4f5683' }} // Opcional: Cambia el color si está seleccionado
          >
            <div className='tarjetBeneficiosImg'>
                <img src={x.imagePrincipal}  />
             </div>
            
             <div className='tarjetBeneficiosTitle'>
                {x.title}
             </div>
             
      
          </div>
       ))
      }
    </div>
  )
}

export default  Beneficios
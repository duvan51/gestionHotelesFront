import React from 'react'

const Beneficios = ({databeneficio}) => {

  return (
    <div className='d-flex gap-2 beneficios'>
      {
       databeneficio.map((x)=>
       (
          <div key={x.id} className='border border-white rounded tarjetBeneficios' type='button' >
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
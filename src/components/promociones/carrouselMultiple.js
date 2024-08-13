import React, {useState, useEffect} from "react";
import Slider from "react-slick";

import { useQuery } from '@apollo/client';
import { GET_ALOJAMIENTOS } from '../../services/queries';

import CardProduct from '../../components/Card/Product'

function MultipleItems({ciudad}) {

    const [ciudades, setCiudades] = useState([]);

    const { loading, error, data } = useQuery( GET_ALOJAMIENTOS );
    
    
    
    

    useEffect(() => {
        if(data && data.getAlojamientos){
            const products = data.getAlojamientos;
            const ciudadFilter = products.filter(x => x.ciudad === ciudad);
            setCiudades(ciudadFilter)
        }
      }, [data, ciudad]); // e<- add empty brackets here
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;


     



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };


 
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {ciudades.map((x)=>(

            <div key={x.id}>
                <CardProduct data={x}/>
            </div>   

        ))}
      </Slider>
    </div>
  );
}

export default MultipleItems;
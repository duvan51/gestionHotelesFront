import React, {useState, useEffect} from "react";
import Slider from "react-slick";

import { useQuery } from '@apollo/client';
import { GET_ALOJAMIENTOS } from '../../services/queries';

import CardProduct from '../../components/Card/Product'

import { useMediaQuery } from 'react-responsive';

function MultipleItems({ciudad}) {

    const [ciudades, setCiudades] = useState([]);

    const { loading, error, data } = useQuery( GET_ALOJAMIENTOS );


    //media queries 
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    
    
    

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
    slidesToShow: isMobile? 1:3,
    slidesToScroll:isMobile? 1:3,
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
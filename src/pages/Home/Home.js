import React from 'react'
import amazonas from '../../assets/amazonas.jpg'
import bogota from '../../assets/bogota.png'    
import boyaca from '../../assets/boyaca.jpg'    
import medellin from '../../assets/medellin.jpg'    
import neiva from '../../assets/neiva.webp'  
import sanAndres from '../../assets/san-andres.webp'  



import "./Home.css"

import Header from '../../layouts/header/header.js'
import FilterCiudades from '../../components/promociones/filterCiudades.js'
import Footer from '../../layouts/Footer/footer.js'


import CarrouselmultipleItems from '../../components/promociones/carrouselMultiple.js'

import ImageBanner from '../../assets/hotels.png'
import Search from '../../components/search/search.js'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'



function Home (){
  const navigate = useNavigate()

  const [dataFromChild, setDataFromChild] = useState('');




  //esto es un search------------------------------
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
//-----------------------------------------------


  const handleclick = () =>{
    navigate('/search')
  }
  

  return (
    <div className='home'>
        <div className='anuncios-header'>
            esto es para anuncios
        </div>  
        <div className='homeConiner'>
            <div className='HomeBanner'>
              <img src={ImageBanner} />
            </div>
            <div className='HomeBody'>
            <div className='searchComponent' onClick={handleclick}>
              <Search onData={handleDataFromChild}  />
            </div>
              <div className='HomeBodyOfertasBanners pt-4'>
                  <div>Ofertas Exclusivas</div>
                  <h3>Alojamientos en Villavicencio</h3>
                  <div className='HomeBodyOfertasBannersCarrousel '>
                    <CarrouselmultipleItems ciudad={'Villavicencio'} />
                  </div>
              </div>
              <div className='HomeBodyOfertasCiudades pt-4'>
                <h2>Ciudades principales</h2>
                <div className='HomeBodyOfertasCiudadesGrid'>
                   <div className='div1'><h2>Amazonas</h2><img src={amazonas} /></div>
                   <div className='div2'><h2>Bogota</h2><img src={bogota} /></div>
                   <div className='div3'><h2>Neiva</h2><img src={neiva}  /></div>
                   <div className='div4'><h2>Medellin</h2><img src={medellin}  /></div>
                   <div className='div5'><h2>San Andres</h2><img src={sanAndres}  /></div>
                   <div className='div6'><h2>Medellin</h2><img src={medellin}  /></div> 
                </div>
              </div>
              <div className='HomeBodyOfertasBanners pt-4'>
                  <h3>Alojamientos en Bogota </h3>
                  <div className='HomeBodyOfertasBannersCarrousel'>
                    <CarrouselmultipleItems ciudad={'Bogotá D.C.'} />
                  </div>
              </div>
            </div>  
        </div>
        <Footer />
    </div>
  )
}

export default Home;
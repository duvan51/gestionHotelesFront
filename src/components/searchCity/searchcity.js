import React, { useState, useEffect } from "react";
import { getRegions, getCiudades } from "../../services/apiColombia";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaMapPin } from "react-icons/fa";

const Searchcity = ({onData}) => {

    const[valueInput, setValueInput]=useState("");
    const [Regions, setRegions] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [search, setSearch] = useState([])

      const searcher = (e) => {
        setSearch(e.target.value);
       
      };

      let results = [];
      if (!search) {
        results = ciudades;
      } else {
        results = ciudades.filter((x) =>
         //x.municipio.toLowerCase().includes(search.toLowerCase())
        x.municipio.toLowerCase().includes(search)
        );
      }
      
   
     
      



  useEffect(() => {
    // Llama a la función de servicio para obtener productos
    if (getRegions) {
      getRegions()
        .then((data) => {
          // Maneja los datos obtenidos
          setRegions(data);
        })
        .catch((error) => {
          // Maneja los errores
          console.error(error);
        });
    }
    if (getCiudades) {
      getCiudades()
        .then((datas) => {
          // Maneja los datos obtenidos
          setCiudades(datas);
        })
        .catch((error) => {
          // Maneja los errores
          console.error(error);
        });
    }
  }, [getCiudades, getRegions]);

  const handleSelect = (eventKey) => setValueInput(eventKey)

  const handleCityClick =(city)=>{
    if(city){
        onData(city)
    }
  }
  
  





  return (
    <div 
        type="button" 
        className="p-2 w-50 btn btn-primary d-flex justify-content-center"
    >
         <NavDropdown
              onSelect={handleSelect}
              title="Destino"
              id="basic-nav-dropdown"
              className="items-city d-flex"
            >
              <input
                value={search}
                onChange={searcher}
                type="text"
                placeholder="search"
                className="form-control"
              />
              <div className="listCitys">
                {results.map((x) => (
                  <div key={x.c_digo_dane_del_municipio}>
                    <NavDropdown.Item eventKey={x.municipio} onClick={() => handleCityClick(x.municipio)}>
                      <FaMapPin />
                      <span>{x.municipio}</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </div>
                ))}
              </div>
            </NavDropdown>
    </div>
  )
}

export default Searchcity
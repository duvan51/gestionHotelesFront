import React, { useState, useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getRegions, getCiudades } from "../../services/apiColombia";
import { FaMapPin } from "react-icons/fa";

const Search = ({onData}) => {
  const [search, setSearch] = useState("");

  const [Regions, setRegions] = useState([]);
  const [ciudades, setCiudades] = useState([]);
 
  const[valueInput, setValueInput]=useState("");


  
  const searcher = (e) => {
    setSearch(e.target.value);
    onData(e.target.value);
  };

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

  let results = [];
  if (!search) {
    results = ciudades;
  } else {
    results = ciudades.filter((x) =>
      x.municipio.toLowerCase().includes(search.toLowerCase())
    );
  }
  //console.log('regions=> ', Regions)
  //console.log('ciuadades=> ', ciudades)
  const handleSelect = (eventKey) => setValueInput(eventKey)
  const sendDataToParent = () => {
    if(valueInput===1){
      const data = valueInput
      onData(data);
      console.log('filter destino=> ',data)
    }else if(search===3){
      const data = search
      onData(data);
      console.log('searching..=> ',data)
    }
    
  };
  


  return (
    <div className="search">
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="search"
        className="form-control"
      />

      <button onClick={sendDataToParent}>
        search
      </button>

      <div className="HeaderFilter">
        <NavDropdown
          onSelect={handleSelect}
          title="Destino"
          id="basic-nav-dropdown"
          className="items-city"
        >
          <input
            value={search}
            onChange={searcher}
            type="text"
            placeholder="search"
            className="form-control"
          />
          <div className="listCitys">
          {results.map(
            (x) => (
              (
                <div key={x.c_digo_dane_del_municipio}>
                  <NavDropdown.Item eventKey={x.municipio}>
                    <FaMapPin /> 
                    <span>
                    {x.municipio}
                    </span>
                </NavDropdown.Item>
                  <NavDropdown.Divider />
                </div>
              )
            )
          )}
          </div>
        </NavDropdown>
        <NavDropdown title="Destino" id="basic-nav-dropdown"></NavDropdown>
      </div>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import { typeOfAlojamientos } from "../../services/apiColombia.js";
import { useQuery } from "@apollo/client";
import { GET_ALOJAMIENTOS } from "../../services/queries";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Pagination } from 'flowbite-react';
import CardAlojamientos from "./cardsAlojamientos/cardAlojamientos.js";
import Searching from '../../components/search/search.js';

const Search = () => {
    const ITEMS_PER_PAGE = 9;
  const [alojamientos, setAlojamientos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [dataFromChild, setDataFromChild] = useState('');


  const { loading, error, data } = useQuery(GET_ALOJAMIENTOS);

  let results = [];
  if (!dataFromChild) {
    results = alojamientos;
  } else {
    results = alojamientos.filter((x) =>
      x.title.toLowerCase().includes(dataFromChild.toLowerCase()) ||
      x.ciudad.toLowerCase().includes(dataFromChild.toLowerCase()) ||
      x.departamento.toLowerCase().includes(dataFromChild.toLowerCase())
    );
  }
 

  /*Start  Alojamiento */
  useEffect(() => {
    if (data && data.getAlojamientos) {
      setAlojamientos(data.getAlojamientos);
    }
  }, [data]); 
  /*End Alojamiento */

  //pagination
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const resultsToDisplay = results.slice(startIdx, endIdx);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

//esto es un search------------------------------
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
//-----------------------------------------------

  return (
    <div className="PageSearch pt-4">
      <Searching onData={handleDataFromChild} />
      <div className="PageSearchBody">
        <div className="PageSearchBodyAlojamientos">
          {resultsToDisplay.map((x) => (
            // console.log(x.title),
            <CardAlojamientos key={x.id} info={x} />
          ))}
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-4 pagination">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(results.length / ITEMS_PER_PAGE)}
          onPageChange={onPageChange}
          previousLabel="Back"
          nextLabel="Next"
          showIcons
        />
      </div>
    </div>
  );
};

export default Search;

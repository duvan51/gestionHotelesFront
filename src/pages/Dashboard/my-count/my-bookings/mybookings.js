import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_uniq, Get_Reservas_ById } from "../../../../services/queries";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Pagination } from "flowbite-react";
import CardAlojamientos from "./cardBookings";

const Mybookings = () => {
  const ITEMS_PER_PAGE = 9;
  const { loading, error, data } = useQuery(GET_USERS_uniq);
  const [Reservas, setReservas] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getReservas = [];

  const searcher = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value)
  };
  let results = [];
  if (!search) {
    results = Reservas;
  } else {
    results = Reservas.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    if (data && data.getUser) {
      setReservas(data.getUser.Reservas);
    }
  }, [data]);



  //pagination
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const resultsToDisplay = results.slice(startIdx, endIdx);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };



  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    if (error.message === "Not Found") {
      return <p>Error: {error.message}</p>;
    } else if (error.message === "not authenticated") {
      localStorage.removeItem("token");
      localStorage.removeItem("UserName");
      console.log("eliminado usaurio");
      window.location.reload();
      return <p>Error not : {error.message}</p>;
    }
    return <p>Error-: {error.message}</p>;
  }

  return (
    <div className="PageSearch pt-4">
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="search"
        className="form-control"
      />
      <div className="HeaderFilter">
        <NavDropdown title="Status" id="basic-nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Procesando</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Completado</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">En espera</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Destino" id="basic-nav-dropdown"></NavDropdown>
      </div>
      <div className="PageSearchBody">
        <div className="PageSearchBodyAlojamientos">
          {resultsToDisplay ? (
            resultsToDisplay.map((x) => (
              <CardAlojamientos key={x.id} info={x} idAlojamiento={x.id} />
              // <></>
            ))
          ) : (
            <></>
          )}
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

export default Mybookings;

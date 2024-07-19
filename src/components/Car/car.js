import React, { useContext, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client"; // Importar createRoot desde react-dom/client
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableComponent from "./tableComponent";
import { CartContext } from "../../context/carContext";
import { BsCashCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";

const Car = () => {
  const navigate = useNavigate();
  const { dispatch, cart } = useContext(CartContext);
  const MySwal = withReactContent(Swal);
  const swalContainerRef = useRef(null);
  const [cartnumber, setCartnumber] = useState(0);

  let closeSwalHandler = null;  //cerrar ventana



  const valueDelete = (x) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: x } });
    updateSwalContent();
  };

  const handleClick = () => {
    navigate("/dashboard/carr"); // Cambia '/your-target-route' a la ruta a la que quieras navegar
    if(closeSwalHandler){
      closeSwalHandler();
    }
  };

  const updateSwalContent = () => {
    if (swalContainerRef.current) {
      const container = document.getElementById("swal-table-container");
      if (container) {
        createRoot(container).render(
          <div>
            <TableComponent data={cart} deleteId={valueDelete} />
            <button type="button" className="btn btn-success" onClick={handleClick}>
              <BsCashCoin />
            </button>
          </div>
        );
      }
    }
  };

  const showSwal = () => {
    MySwal.mixin({
      title: <i>Reservacion</i>,
      position: "top-end",
      toast: true,
      html: '<div id="swal-table-container"></div>', // Placeholder for React component
      showConfirmButton: false,
      didOpen: () => {
        swalContainerRef.current = true;
        updateSwalContent();
        closeSwalHandler = () => {
          Swal.close();
        };
      },
      willClose: () => {
        swalContainerRef.current = false;
      },
    }).fire();
  };

  useEffect(() => {
    if (swalContainerRef.current) {
      updateSwalContent();
    }
  }, [cart]);

  useEffect(() => {
    const ca = cart.length;
    if (ca) {
      setCartnumber(ca);
    }
  }, [cart]);

  return (
    <>
      <button 
        onClick={showSwal} 
        data-swal-toast-template="#my-template"
        type="button" 
        className="btn btn-success text-light"
      >
        <LuShoppingBag />
      </button>
      {!cart.length ? (
        <></>
      ) : (
        <div>
          <div>{cartnumber}</div>
        </div>
      )}
    </>
  );
};

export default Car;

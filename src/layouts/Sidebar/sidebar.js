import React, { useEffect, useState, useContext,} from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { GET_USERS_uniq } from "../../services/queries";
import { useQuery } from "@apollo/client";
import { CartContext } from "../../context/carContext";



import { FaList } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_USERS_uniq);
  const [Alojamientos, setAlojamientos] = useState([]);
  const { dispatch, cart } = useContext(CartContext);

  


  useEffect(() => {
    if (data && data.getUser) {
      setAlojamientos(data.getUser.Alojamientos);
    }
  }, [data]);



  return (
    <div className="sidebar">
      {/*sidebar escritorio*/}
      <div className="sidebarGrups sidebarEscritorio">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Mi cuenta</Accordion.Header>
            <Accordion.Body>
              <Link className="sidebarMenuNavegacionItems" to="/dashboard">
                <div className="sidebarMenuNavegacionItemsItem" href="">
                  <div className="sidebarMenuNavegacionItemsItemBody">
                    <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                      ▶️
                    </div>
                    <div className="sidebarMenuNavegacionItemsItemBodyText">
                      Escritorio
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                className="sidebarMenuNavegacionItems"
                to="/dashboard/my-profile"
              >
                <div className="sidebarMenuNavegacionItemsItem" href="">
                  <div className="sidebarMenuNavegacionItemsItemBody">
                    <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                      ▶️
                    </div>
                    <div className="sidebarMenuNavegacionItemsItemBodyText">
                      Mi perfil
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                className="sidebarMenuNavegacionItems"
                to="/dashboard/my-bookings"
              >
                <div className="sidebarMenuNavegacionItemsItem" href="">
                  <div className="sidebarMenuNavegacionItemsItemBody">
                    <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                      ▶️
                    </div>
                    <div className="sidebarMenuNavegacionItemsItemBodyText">
                      Reservas
                    </div>
                  </div>
                </div>
              </Link>

              {cart.length > 0 && (
                <Link className="sidebarMenuNavegacionItems" to="/dashboard/carr">
                <div className="sidebarMenuNavegacionItemsItem" href="">
                  <div className="sidebarMenuNavegacionItemsItemBody">
                    <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                      ▶️
                    </div>
                    <div className="sidebarMenuNavegacionItemsItemBodyText">
                      Mi carrito
                    </div>
                  </div>
                </div>
                </Link>

              )
              } 

              
            </Accordion.Body>
          </Accordion.Item>

          {/*grupo de servicios que ofrezco"*/}
          {Alojamientos ? (
            <Accordion.Item eventKey="1">
              <Accordion.Header>Mis servicios</Accordion.Header>
              <Accordion.Body>
                <Link
                  className="sidebarMenuNavegacionItems"
                  to="/dashboard/my-services-summary"
                >
                  <div className="sidebarMenuNavegacionItemsItem" href="">
                    <div className="sidebarMenuNavegacionItemsItemBody">
                      <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                        ▶️
                      </div>
                      <div className="sidebarMenuNavegacionItemsItemBodyText">
                        Resumen
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  className="sidebarMenuNavegacionItems"
                  to="/dashboard/all&alojamientos"
                >
                  <div className="sidebarMenuNavegacionItemsItem" href="">
                    <div className="sidebarMenuNavegacionItemsItemBody">
                      <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                        ▶️
                      </div>
                      <div className="sidebarMenuNavegacionItemsItemBodyText">
                        Lista alojamientos
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  className="sidebarMenuNavegacionItems"
                  to="/dashboard/cuartos"
                >
                  <div className="sidebarMenuNavegacionItemsItem" href="">
                    <div className="sidebarMenuNavegacionItemsItemBody">
                      <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                        ▶️
                      </div>
                      <div className="sidebarMenuNavegacionItemsItemBodyText">
                        Cuartos
                      </div>
                    </div>
                  </div>
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          ) : (
            <Link
              className="sidebarMenuNavegacionItems"
              to="/dashboard/add&alojamientos"
            >
              <div className="sidebarMenuNavegacionItemsItem" href="">
                <div className="sidebarMenuNavegacionItemsItemBody">
                  <div className="sidebarMenuNavegacionItemsItemBodyIcon">
                    ▶️
                  </div>
                  <div className="sidebarMenuNavegacionItemsItemBodyText">
                    Add Alojamiento
                  </div>
                </div>
              </div>
            </Link>
          )}
        </Accordion>

        {/*grupo de herramientas a la mano = moneda"*/}

        <div className="sidebarGrups">
          <div className="title"> Settings </div>

          <Link className="sidebarMenuNavegacionItems" to="/dashboard/perfil">
            <div className="sidebarMenuNavegacionItemsItem" href="">
              <div className="sidebarMenuNavegacionItemsItemBody">
                <div className="sidebarMenuNavegacionItemsItemBodyIcon">▶️</div>
                <div className="sidebarMenuNavegacionItemsItemBodyText">
                  Mi perfil
                </div>
              </div>
            </div>
          </Link>
          <Link className="sidebarMenuNavegacionItems" to="/dashboard/perfil">
            <div className="sidebarMenuNavegacionItemsItem" href="">
              <div className="sidebarMenuNavegacionItemsItemBody">
                <div className="sidebarMenuNavegacionItemsItemBodyIcon">▶️</div>
                <div className="sidebarMenuNavegacionItemsItemBodyText">
                  Mi perfil
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>







      { /*mobil*/}
      <div className="sidebarMobil">
        <Link className="MenuSidebarIcono" to="/dashboard">
          <FaUserTie />
        </Link>
        <Link className="MenuSidebarIcono" to="/dashboard/my-profile">
          <AiFillDashboard />
        </Link>
        <Link className="MenuSidebarIcono" to="/dashboard/my-bookings">
          <FaHistory />
        </Link>
        <Link className="MenuSidebarIcono" to="/dashboard/all&alojamientos">
          <FaBuildingUser />
        </Link>
        <Link className="MenuSidebarIcono" to="/dashboard/cuartos">
          <MdOutlineBedroomParent />
        </Link>

        <Link className="MenuSidebarIcono">
          <RiUserSettingsFill />
          <IoBagCheckSharp />
        </Link>
        
        
        <Link className="MenuSidebarIcono">
          <FaList />
        </Link>
        
        <Link className="MenuSidebarIcono"  to="/dashboard/carr">
          <IoBagCheckSharp />
        </Link>
      </div>
      
    </div>
  );
};

export default Sidebar;

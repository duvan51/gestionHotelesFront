import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_uniq } from "../../services/queries";
import { PiBackpackBold } from "react-icons/pi";
import { RiHotelLine } from "react-icons/ri";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS_uniq);

  const [user, setUser] = useState({});
  const [Reservas, setReservas] = useState([]);
  const [Alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    if (data && data.getUser) {
      setUser(data.getUser);
      setReservas(data.getUser.Reservas);
      setAlojamientos(data.getUser.Alojamientos);
    }
  }, [data]);

  if (loading) return <p>loading... </p>;
  if (error) return <p>Error: {error.message} </p>;

  //espacios para reservas

  const reservasSum = Reservas.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.payment;
  }, 0);
  console.log(Reservas)

  
  //espacios para hoteles

  const ingresoSum = Alojamientos.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.payment;
  }, 0);

  





  return (
    <div className="dashboard">
      <div className="dashboardBody">
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Mis Reservas">
        <div className="dashboardBodyMain">
          <div className="d-flex gap-3">
              {/* card card */}
            <div className="card DashboardCard" style={{ width: "18rem" }}>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title">Reservas</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex card-subtitle mb-2 text-body-secondary cardPrice">
                      <p className="d-flex align-items-center">
                        $ {reservasSum}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-1">
                    <div>{Reservas.length}</div>
                    <div className="text-secondary"> en total</div>
                  </div>

                </div>
                <div>
                  <div className="fs-1 d-flex">
                    <PiBackpackBold />
                  </div>
                </div>
              </div>
            </div>


              {/* card card */}
            <div className="card DashboardCard" style={{ width: "18rem" }}>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title">
                    Ciudades
                  </h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex card-subtitle mb-2 text-body-secondary cardPrice">
                      <p className="d-flex align-items-center">
                        $ {ingresoSum}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-1">
                    <div>{Alojamientos.length}</div>
                    <div className="text-secondary">en total</div>
                  </div>
                </div>
                <div>
                  <div className="fs-1 d-flex">
                    <RiHotelLine />
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
        <div className="pt-2">
            <div>Ciuades visitadas</div>
            <div>Ciuades visitadas</div>
        </div>
      </Tab>
      <Tab eventKey="profile" title="Mis Hoteles">
        
      <div className="dashboardBodyMain">
          <div className="d-flex gap-3">


            <div className="card DashboardCard" style={{ width: "18rem" }}>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title">Reservas</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex card-subtitle mb-2 text-body-secondary cardPrice">
                      <p className="d-flex align-items-center">
                        $ {reservasSum}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-1">
                    <div>{Reservas.length}</div>
                    <div className="text-secondary"> en total</div>
                  </div>

                </div>
                <div>
                  <div className="fs-1 d-flex">
                    <PiBackpackBold />
                  </div>
                </div>
              </div>
            </div>



            <div className="card DashboardCard" style={{ width: "18rem" }}>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="card-title">Mis Hoteles</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex card-subtitle mb-2 text-body-secondary cardPrice">
                      <p className="d-flex align-items-center">
                        $ {ingresoSum}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-1">
                    <div>{Alojamientos.length}</div>
                    <div className="text-secondary">en total</div>
                  </div>
                </div>
                <div>
                  <div className="fs-1 d-flex">
                    <RiHotelLine />
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { GET_USERS_uniq } from "../../services/queries";
import { useQuery } from "@apollo/client";

import ImageProfile from "../../assets/profile.png";

const HeaderDashboard = () => {
  const navigate = useNavigate();
  const UserName = localStorage.getItem("UserName");
  const token = localStorage.getItem("token");

  const { loading, error, data } = useQuery(GET_USERS_uniq);

  const MySwal = withReactContent(Swal);

  const handleLogut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("id");
    console.log("eliminado usaurio");
    window.location.reload();
  };
 

  const CustomComponent = () => (
    <div>
      <div className="border-bottom pb-2">
        <div className="fw-bold">{data.getUser.Name}</div>
        <div className="text-secondary">{data.getUser.email}</div>
      </div>
      <div className="pt-2">
        
      </div>
    </div>
  );

  const showSwal = () => {
    MySwal.fire({
      position: "top-end",
      toast: true,
      html: '<div id="swal-table-container" class="sweetAlertProfile"></div>', // Placeholder for React component
      showConfirmButton: false,
      didOpen: () => {
        render(
          <CustomComponent />,
          document.getElementById("swal-table-container")
        );
      },
      willClose: () => {},
    });
  };

  return (
    <Navbar
      expand="lg"
      className="headerDashboard border-bottom border-success p-2 mb-2 border-opacity-25 border-white"
    >
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border border-light rounded-3 text-primary-emphasis"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto menu">
            <Container className="d-flex justify-content-between align-items-center">
              <div onClick={()=>{navigate("/")}} className="logo">
                <Nav href="#home">Hoteles</Nav>
              </div>

              <div className="HeaderOptions d-flex flex-row">
                <div className="ButtonLogoutName">
                  <div>
                    <button
                      onClick={handleLogut}
                      type="button"
                      className="btn btn-danger"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <button
                  onClick={showSwal}
                  className="imageProfile d-flex flex-row align-items-center justify-content-center rounded-circle"
                >
                  <div className="contentImageProfile  rounded-circle d-flex flex-row align-items-center justify-content-center">
                    <img src={ImageProfile} />
                  </div>
                </button>
              </div>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderDashboard;

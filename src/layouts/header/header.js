import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link,useNavigate} from "react-router-dom";

import Login from "../../components/Login/login.js";
import Car from "../../components/Car/car.js";

import Logo from '../../assets/logo.png'

const Header = () => {
  const navigate = useNavigate();
  const UserName = localStorage.getItem("UserName");
  const token = localStorage.getItem("token");

  const handleLogut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("id");
    console.log("eliminado usaurio");
    window.location.reload();
  };


  return (
    <Navbar expand="lg" className="header ">
      <Container>
        <Navbar className="Logo" to="/" onClick={()=>{navigate(`/`)}}>
          <img src={Logo} alt="logo de empresa"/>
        </Navbar>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border border-light rounded-3 text-primary-emphasis"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto menu">
            <Container className="d-flex justify-content-between optionMobil">
              <div className="spaceBlank">
               

              </div>

              <div className="HeaderOptions">
                {UserName ? (
                  <NavDropdown title="MENU" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Idioma
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      <Link to="/">Moneda</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Ubicacion
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    {UserName === null ? (
                      <NavDropdown.Item href="#action/3.4">
                        <Link to="/register&user">Crear cuenta</Link>
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item href="#action/3.4">
                        <Link to="/dashboard/list-housing">Dashboard</Link>
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                ) : (
                  <></>
                )}

                {!UserName ? (
                  <div className="buttons">
                    <Login />
                    <button  
                      type="button" 
                      className="btn btn-primary" 
                      onClick={()=>{navigate("/register&user")}}
                      >
                      Register
                    </button>
                  </div>
                ) : (
                  
                  <div className="ButtonLogoutName">
                    <div>
                      <button onClick={handleLogut}
                        type="button" 
                        className="btn btn-danger"
                        > 
                         Logout 
                      </button>
                    </div>
                    <div className="headerName">Hello : {UserName}</div>
                  </div>
                )}
                {UserName ? (
                  <div className="MenuCar">
                    <Car />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

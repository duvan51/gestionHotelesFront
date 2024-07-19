import "./App.css";
import { Navigate, Route, Routes, Router } from "react-router-dom";

import Home from "./pages/Home/Home.js";
import Search from "./pages/Search/search.js";
import Header from "./layouts/header/header.js";
import HeaderDashboard from "./layouts/header/headerDashboard.js"
import Footer from "./layouts/Footer/footer.js";
import RegisterUser from "./pages/registerUser/registerUser.js";
import Dashboard from "./pages/Dashboard/dashboard.js";

import Sidebar from "./layouts/Sidebar/sidebar.js";
import alojamientos from "./pages/Dashboard/my-services/Housing/housing.js";

import Summary from "./pages/Dashboard/my-services/summary/summary.js";
import Listhousing from "./pages/Dashboard/my-services/Housing/housing.js";

import AllMyAlojamientos from "./pages/Dashboard/my-services/alojamientos/allMyAlojamientos.js";
import AddAlojamientos from "./pages/Dashboard/my-services/alojamientos/addAlojamientos.js";
import Mybookings from "./pages/Dashboard/my-count/my-bookings/mybookings.js";

import AlojamientosID from "./pages/AlojamientoId/alojamientoId.js";

import Perfil from "./pages/Dashboard/my-count/my-profile/my-profile.js";
import MyCar from "./pages/Dashboard/my-count/my-car/myCar.js";


import AdminApp from "./pages/adminApp.js";

//Conext componentes globales
import { CartProvider } from "./context/carContext.js";

function App() {
  const UserName = localStorage.getItem("UserName");

  //proteccion de rutas
  const ProtectedRoute = ({ children }) => {
    return UserName ? children : <Navigate to="/" />;
  };

  return (
    <CartProvider>
      <div>
        <div className="App">
          <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Header />
                    <Home />
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/search"
                element={
                  <div>
                    <Header />
                    <Search />
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/views/:id"
                element={
                  <div>
                    <Header />
                    <AlojamientosID />
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/register&user"
                element={
                  <div>
                    <Header />
                    <RegisterUser />
                    <Footer />
                  </div>
                }
              />
            <>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                        <HeaderDashboard />
                        <Dashboard />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/my-profile"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <Perfil />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:id/dashboard/list-housing"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <Listhousing />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/add&alojamientos"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <AddAlojamientos />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/all&alojamientos"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <AllMyAlojamientos />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/my-services-summary"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <Summary />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/list-housing"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <Summary />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/carr"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <MyCar />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/my-bookings"
                element={
                  <ProtectedRoute>
                    <div className="page-with-sidebar">
                      <Sidebar />
                      <div className="content">
                      <HeaderDashboard />
                        <Mybookings />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </>

            <Route
              path="/panelAdminDashboard@1231283681273jdshbfjh"
              element={<AdminApp />}
            />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;

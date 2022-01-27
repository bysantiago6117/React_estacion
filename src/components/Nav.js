import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RegistroUsu from "./RegistroUsu";
import RegistroEst from "./RegistroEst";
import Login from "./login";
import DeviceMap from "./MapView";
import usuario from "../imagenes/usuario (1).png";

const Nav = () => {
  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light" id="navegacion">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#">
              Navegacion
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/registro"
                >
                  Estaciones
                  <link to="/registro"></link>
                </a>
                <a className="nav-link active" href="/mapa">
                  Mapa
                  <link to="/mapa"></link>
                </a>
              </div>
            </div>
            <div className="mt-1">
              <a className="nav-link active" aria-current="page" href="/login">
                <img src={usuario} id="img" />
                <link to="/login"></link>
              </a>
            </div>
          </div>
        </nav>
        <BrowserRouter>
          <Switch>
            <Route exact path="/registrar" component={RegistroUsu} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registro" component={RegistroEst} />
            <Route exact path="/mapa" component={DeviceMap} />
          </Switch>
        </BrowserRouter>
      </div>
      ;
    </div>
  );
};

export default Nav;

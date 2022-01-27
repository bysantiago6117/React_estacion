import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import RegistroUsu from "./RegistroUsu";
import axios from "axios";

var usuarios = [];
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(
      "http://localhost:8181/usuario/buscar/usuarios"
    );
    usuarios = res.data;
    console.log(usuarios);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let i;
    var comprobar = false;

    console.log(usuarios);
    const nombre = document.getElementById("nombre").value;
    const contraseña = document.getElementById("contraseña").value;
    for (i = 0; i < usuarios.length; i++) {
      if (nombre === usuarios[i].nombre) {
        if (contraseña === usuarios[i].contraseña) comprobar = true;
        break;
      }
    }
    if (comprobar === true) {
      document
        .getElementById("alerta_succes")
        .append(
          `El usuario se ha logueado sastifactoriamente, Ingrese a estaciones`
        );
    } else {
      document
        .getElementById("alerta_danger")
        .append(`El nombre y la contraseña no estan registrados`);
    }
  }

  render() {
    return (
      <div id="caja_login" className="mt-5">
        <div className="submit-form">
          <from onSubmit={this.handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label className="mt-4">Nombre</label>
              <input
                className="form-control text-center"
                style={{
                  background: "#24303c",
                  border: "1px solid white",
                  color: "white",
                  borderradius: "4px",
                }}
                type="text"
                placeholder="Ingrese su nombre"
                id="nombre"
                required
                name="nombre"
              />
            </div>
            <div className="form-group">
              <label className="mt-2">Contraseña</label>
              <input
                className="form-control text-center"
                style={{
                  background: "#24303c",
                  border: "1px solid white",
                  color: "white",
                  borderradius: "4px",
                }}
                type="password"
                placeholder="Ingrese su contraseña"
                id="contraseña"
                required
                name="contraseña"
              />
            </div>

            <button
              className="btn btn-block bg-primary mt-5 text-white"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Iniciar sesion
            </button>
          </from>
        </div>

        <a aria-current="page" href="/registrar">
          <button className="btn btn-block bg-secondary mt-2 text-white">
            Registrarse
          </button>
        </a>

        <div
          id="alerta_danger"
          className="mt-4"
          style={{ background: "rgb(206, 85, 85)" }}
        ></div>

        <div id="alerta_succes" className="mt-4 bg-success"></div>

        <br />
        <BrowserRouter>
          <Switch>
            <Route exact path="/registrar" component={RegistroUsu} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

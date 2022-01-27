import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import axios from "axios";
import { Switch, Route, BrowserRouter } from "react-router-dom";

var usuarios = [];
var comprobar = false;
export default class RegistroUsu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      nombre: "",
      email: "",
      contraseña: "",
      edad: "",
      ciudad: "",
    };

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

  handleSubmit = async (e) => {
    e.preventDefault();
    let i;
    var email = document.getElementById("email").value;
    var contraseña = document.getElementById("contraseña").value;
    for (i = 0; i < usuarios.length; i++) {
      if (email === usuarios[i].email) {
        if (contraseña === usuarios[i].contraseña) {
          document
            .getElementById("alerta_danger")
            .append(
              `Email y Contraseña ya registradas por favor ingrese una correo diferente`
            );
          comprobar = true;
          break;
        }
      }
    }

    if (comprobar !== true) {
      try {
        let config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        };

        let res = await fetch("http://localhost:8181/usuario/crear", config);
        let json = await res.json();
        console.log(json);

        document
          .getElementById("alerta_succes")
          .append(`El usuario se ha registrado sastifactoriamente`);
      } catch (error) {}
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <div id="caja_login">
          <form onSubmit={this.handleSubmit}>
            <div>
              <h2> Registrarse</h2>
              <div className="submit-form">
                <div className="form-group mt-4">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    placeholder="escribe el nombre"
                    className="form-control text-center"
                    style={{
                      background: "#24303c",
                      border: "1px solid white",
                      color: "white",
                      borderradius: "4px",
                    }}
                    id="nombre"
                    required
                    name="nombre"
                    onChange={this.handleChange}
                    value={this.state.nombre}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo</label>
                  <br />
                  <input
                    type="email"
                    className="form-control text-center"
                    placeholder="escribe tu correo"
                    style={{
                      background: "#24303c",
                      border: "1px solid white",
                      color: "white",
                      borderradius: "4px",
                    }}
                    id="email"
                    required
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contraseña">Contraseña</label>
                  <br />
                  <input
                    type="password"
                    className="form-control text-center"
                    placeholder="Escribe tu contraseña"
                    style={{
                      background: "#24303c",
                      border: "1px solid white",
                      color: "white",
                      borderradius: "4px",
                    }}
                    id="contraseña"
                    required
                    name="contraseña"
                    onChange={this.handleChange}
                    value={this.state.contraseña}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edad">Edad</label>
                  <br />
                  <input
                    type="number"
                    className="form-control text-center"
                    placeholder="Escribe tu edad"
                    style={{
                      background: "#24303c",
                      border: "1px solid white",
                      color: "white",
                      borderradius: "4px",
                    }}
                    id="edad"
                    required
                    name="edad"
                    onChange={this.handleChange}
                    value={this.state.edad}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ciudad">Ciudad</label>
                  <br />
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Escribe tu ciudad"
                    style={{
                      background: "#24303c",
                      border: "1px solid white",
                      color: "white",
                      borderradius: "4px",
                    }}
                    id="ciudad"
                    required
                    name="ciudad"
                    onChange={this.handleChange}
                    value={this.state.ciudad}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-block bg-primary mt-4 text-white"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Registrarse
            </button>
          </form>
          <a aria-current="page" href="/login">
            <button
              className="btn btn-block bg-secondary mt-2 text-white"
              style={{ textdecoration: "none" }}
            >
              Ir al login
            </button>
          </a>

          <div
            id="alerta_danger"
            className="mt-4"
            style={{ background: "rgb(206, 85, 85)" }}
          ></div>

          <div id="alerta_succes" className="mt-4 bg-success"></div>

          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

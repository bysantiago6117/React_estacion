import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistroPar from "./RegistroPar";

export default class RegistroEst extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      nombre_estacion: "",
      descripcion_estacion: "",
      region: "",
      latitude: "",
      longitude: "",
      unidad_manejo: "",
      area: "",
      disable: false,
      parcelas: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  cancelCourse = () => {
    this.setState({
      nombre_estacion: "",
      descripcion_estacion: "",
      region: "",
      latitude: "",
      longitude: "",
      unidad_manejo: "",
      area: "",
      disable: false,
    });
  };

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  ocultar = (e) => {
    console.log(this.state.disable);
    if (this.state.disable === false) {
      document.getElementById("parcela").style.display = "block";
      this.setState((state) => {
        return { disable: true };
      });
    } else {
      document.getElementById("parcela").style.display = "none";
      this.setState((state) => {
        return { disable: false };
      });
    }
  };

  handleSubmit = async (e) => {
    this.state.longitud = parseFloat(this.state.longitud);
    this.state.latitud = parseFloat(this.state.latitud);
    e.preventDefault();

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };
      let res = await fetch("http://localhost:8181/estacion/crear", config);
      let json = await res.json();
      this.state.id = json.ide;
      console.log(this.state.id);
      alert("se creo la estacion sastifactoriamente");
    } catch (error) {}
  };

  render() {
    let prueba = this.state.id;
    return (
      <div className="container px-4 px-lg-5 my-3">
        <form onSubmit={this.handleSubmit} id="create-course-form">
          <div
            className="container border border-dark px-4 px-lg-5 p-2"
            id="caja"
          >
            <div className="submit-form">
              <h3 className="text-center mt-4 font-italic">
                Informacion general
              </h3>
              <hr></hr>

              <div className="form-group">
                <label className="labels" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Escribe el nombre de la estacion"
                  className="form-control"
                  style={{ width: "100%" }}
                  id="nombre_estacion"
                  required
                  name="nombre_estacion"
                  onChange={this.handleChange}
                  value={this.state.nombre_estacion}
                />
              </div>

              <div className="form-group">
                <label className="labels mt-2" htmlFor="descripcion">
                  Descripcion
                </label>
                <br />
                <textarea
                  style={{ width: "100%", height: "150px" }}
                  id="descripcion_estacion"
                  placeholder="Escribe la Descripcion de la estacion..."
                  required
                  name="descripcion_estacion"
                  onChange={this.handleChange}
                  value={this.state.descripcion_estacion}
                />
              </div>

              <h3 className="text-center mt-5 font-italic">
                Informacion espacial
              </h3>
              <hr />
              <label className=" mt-2 labels" htmlFor="Region">
                Region
              </label>
              <select
                className="ml-2"
                name="region"
                value={this.state.region}
                onChange={this.handleChange}
                size="1"
              >
                <option value="caribe">caribe</option>
                <option value="Andina">Andina</option>
                <option value="Pacífico">Pacífico</option>
                <option value="Insular">Insular</option>
                <option value="amazonia">Amazonia</option>
              </select>

              <div className="form-group">
                <label className="mt-2 labels" htmlFor="latitud">
                  latitud
                </label>
                <input
                  type="number"
                  placeholder="Escribe la latitud de la estacion"
                  className="form-control "
                  style={{ width: "100%" }}
                  id="latitude"
                  required
                  name="latitude"
                  onChange={this.handleChange}
                  value={this.state.latitude}
                />

                <div className="form-group">
                  <label className="mt-3 labels" htmlFor="longitud">
                    longitud
                  </label>
                  <input
                    type="number"
                    placeholder="Escribe la longitud de la estacion"
                    className="form-control "
                    style={{ width: "100%" }}
                    id="longitude"
                    required
                    name="longitude"
                    onChange={this.handleChange}
                    value={this.state.longitude}
                  />
                </div>

                <label className="mt-2 labels" htmlFor="unidad_manejo">
                  Unidad de manejo
                </label>
                <select
                  className="ml-2"
                  name="unidad_manejo"
                  value={this.state.unidad_manejo}
                  onChange={this.handleChange}
                  size="1"
                >
                  <option value="CCPC">CCPC</option>
                  <option value="MKMP">MKMP</option>
                  <option value="MPSQ">MPSQ</option>
                  <option value="SAPR">SAPR</option>
                  <option value="SLPC">SLPC</option>
                </select>
              </div>

              <h3 className="text-center mt-4 font-italic">
                Informacion de muestreo
              </h3>
              <hr />
              <p className="text-center">
                Hay dos tipos de muestreos, el muestreo simple que consta de
                ingresar el area de la estacion
              </p>

              <div class="form-group ">
                <label className="labels" htmlFor="area">
                  Area
                </label>
                <input
                  type="text"
                  placeholder="Escribe la area aqui"
                  className="form-control "
                  style={{ width: "100%" }}
                  id="area"
                  required
                  name="area"
                  onChange={this.handleChange}
                  value={this.state.area}
                />
              </div>
              <p className="text-center mt-5">
                el muestreo compuesto donde se podra agregar las parcelas que
                desee
              </p>
              <p className="text-center">
                Presione el boton compuesta para acceder al formulario de
                parcelas
              </p>

              <div className="row justify-content-center mt-4">
                <button
                  type="button"
                  className="btn btn-info text-light"
                  onClick={this.ocultar}
                >
                  Compuesta
                </button>
              </div>
            </div>

            <div className="row justify-content-center mt-4 p-4">
              <button
                type="submit"
                className="btn btn-block bg-primary text-light "
                value="Submit"
              >
                Guardar
              </button>
              <button
                className="btn btn-block bg-secondary text-light mt-3 "
                onClick={this.cancelCourse}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>

        <div
          className="border border-dark w-100 mt-4 text-center"
          id="parcela"
          style={{ display: "none", backgroundColor: "rgb(228, 224, 224)" }}
        >
          <RegistroPar estacion={prueba} />
        </div>
      </div>
    );
  }
}

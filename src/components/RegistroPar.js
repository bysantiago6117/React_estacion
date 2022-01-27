import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

var parcelas = [];
export default class RegistroPar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idp: null,
      descripcion_parcela: "",
      latitudp: "",
      longitudp: "",
      areap: "",
      estacion: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(
      "http://localhost:8181/parcela/buscar/parcelas"
    );
    parcelas = res.data;
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    parseFloat(this.state.latitudp);
    parseFloat(this.state.longitudp);

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
      let res = await fetch("http://localhost:8181/parcela/crear", config);
      let json = await res.json();
      console.log(json);

      alert("se creo una parcela correctamente");
    } catch (error) {}
  };

  async deleteparcela(idp) {
    await axios
      .delete("http://localhost:8181/parcela/eliminar/" + idp)
      .then((Response) => {
        if (Response.data != null) {
          alert("parcela eliminada sastifatoriamente");
        }
      });
  }

  render() {
    return (
      <div className="container px-4 px-lg-5 my-2" id="caja">
        <div className="container  px-4 px-lg-5 p-2 justify-content-center">
          <h3 className="text-center mt-4 font-italic ">Parcela</h3>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="submit-form border-top w-70">
              <div className="form-group">
                <label className="labels" htmlFor="latitud">
                  Latitud
                </label>
                <input
                  type="number"
                  placeholder="Escribe la latitud de la parcela"
                  className="form-control "
                  id="latitudp"
                  required
                  name="latitudp"
                  onChange={this.handleChange}
                  value={this.state.latitudp}
                />
              </div>

              <div className="form-group">
                <label className="labels" htmlFor="longitud">
                  longitud
                </label>
                <input
                  type="number"
                  placeholder="Escribe la longitud de la parcela"
                  className="form-control "
                  id="longitudp"
                  required
                  name="longitudp"
                  onChange={this.handleChange}
                  value={this.state.longitudp}
                />
              </div>

              <div class="form-group ">
                <label className="labels" htmlFor="area">
                  Area
                </label>
                <input
                  type="text"
                  placeholder="Escribe la area de la parcela"
                  className="form-control"
                  id="areap"
                  required
                  name="areap"
                  onChange={this.handleChange}
                  value={this.state.areap}
                />
              </div>
              <div class="form-group ">
                <label className="labels" htmlFor="descripcion">
                  Descripcion
                </label>
                <br />
                <textarea
                  style={{ width: "100%", height: "110px" }}
                  onChange={this.handleChange}
                  name="descripcion_parcela"
                  value={this.state.descripcion_parcela}
                />
              </div>
              <button
                type="submit"
                className="btn btn-block bg-primary text-light"
                value="Submit"
                onClick={this.mostrar}
              >
                Agregar
              </button>
            </div>
          </form>

          <table className="table mt-3" style={{ width: "100%" }}>
            <thead id="cabecera_table">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Latitud</th>
                <th scope="col">Longiutd</th>
                <th scope="col">Area</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody id="body_table">
              {parcelas.map((parcela, index) => {
                return (
                  <tr key={index}>
                    <td>{parcela.idp}</td>
                    <td>{parcela.latitudp}</td>
                    <td>{parcela.longitudp}</td>
                    <td>{parcela.areap}</td>
                    <td>{parcela.descripcion_parcela}</td>
                    <td>
                      <button
                        className="bg-danger"
                        onClick={this.deleteparcela.bind(this, parcela.idp)}
                      >
                        eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

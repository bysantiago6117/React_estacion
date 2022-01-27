import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const icon = new Icon({
  iconUrl: "/1093169.svg",
  iconSize: [25, 25],
});

export class DeviceMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 4.570868,
      lng: -74.297333,
      zoom: 14,
      estacion: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      "http://localhost:8181/estacion/buscar/estaciones"
    );
    this.setState({ estacion: res.data });
    console.log(this.state.estacion);
  }

  render() {
    var marcador = [];
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="container " id="caja">
        <div id="mapid" className="mt-2">
          <MapContainer
            center={position}
            zoom={this.state.zoom}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {this.state.estacion.map((value, index) => {
              return (
                (marcador = [value.latitude, value.longitude]),
                (
                  <Marker position={marcador} key={value} icon={icon}>
                    <Popup>
                      nombre: {value.nombre_estacion} <br /> latitud:{" "}
                      {value.latitude} <br /> longitud: {value.longitude}
                    </Popup>
                  </Marker>
                )
              );
            })}
          </MapContainer>
        </div>
        <div className="mt-5 ml-3">
          <table className="table text-center">
            <thead id="cabecera_table">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Latitud</th>
                <th scope="col">Longitud</th>
                <th scope="col">region</th>
              </tr>
            </thead>
            <tbody id="body_table">
              {this.state.estacion.map((value, index) => {
                return (
                  <tr key={value}>
                    <td>{value.ide}</td>
                    <td>{value.nombre_estacion}</td>
                    <td>{value.descripcion_estacion}</td>
                    <td>{value.latitude}</td>
                    <td>{value.longitude}</td>
                    <td>{value.region}</td>
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

export default DeviceMap;

import React, { Component } from "react";
import axios from "axios";
import { mdiDelete } from "@mdi/js";
import { mdiAccountEdit } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import Swal from "sweetalert2";
import PersonaServicio from "../servicios/PersonaServicios";
var moment = require("moment");
export default class PersonasListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: "",
      personas: [],
      nombre: "",
      tipoDocumento: ""
    };
    this.borrarPersona = this.borrarPersona.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buscar = this.buscar.bind(this);
  }

  handleChange(e) {
    this.setState({ tipoDocumento: e.target.value });
  }

  handleInputChange(e) {
    this.setState({ nombre: e.target.value });
  }

  getPersonas() {
    PersonaServicio.getPersonas().then(res => {
      console.log(res);
      this.setState({ personas: res.data });
    });
  }

  componentDidMount() {
    this.getPersonas();
  }

  borrarPersona(id, e) {
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar la persona?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar"
    }).then(result => {
      if (result.value) {
        PersonaServicio.borrarPersona(id)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if (res.status === 200) {
              Swal.fire("Eliminado", res.data.mensaje, "success");
            }
            this.getPersonas();
          })
          .catch(error => {
            console.log(error.response);
            Swal.fire("Hubo un error", "", "error");
          });
      }
    });
  }

  buscar = async e => {
    e.preventDefault();
    var personas = [];

    console.log(this.state.tipoDocumento);

    if (this.state.nombre.trim()) {
      personas.concat(
        await PersonaServicio.getPersonasByNombre(this.state.nombre).data
      );
    }

    if (this.state.tipoDocumento.trim()) {
      personas.concat(
        await PersonaServicio.getTipoDocumento(this.state.tipoDocumento).data
      );
    }

    if (personas.length != 0) {
      this.setState({ personas: personas });
    }

    this.setState({ personas: personas });
    console.log(personas.length);
  };

  render() {
    return (
      <div>
        <h2> Filtros </h2>
        <form>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={this.state.nombre}
                onChange={this.handleInputChange}
              ></input>
            </div>
            <div className="form-group col-md-4">
              <label>Tipo de documento</label>
              <select
                id="inputState"
                className="form-control"
                value={this.state.tipoDocumento}
                onChange={this.handleChange}
              >
                <option selected>Seleccione...</option>
                <option>Dni</option>
                <option>Pasaporte</option>
                <option>Cedula</option>
              </select>
            </div>
          </div>
          <div className="form-group col-md-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.buscar}
            >
              Buscar
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col">
            <h2> Personas </h2>
          </div>
          <div className="col col-lg-2">
            <button className="btn btn-success">
              <Link
                to="/persona"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                + NUEVO
              </Link>
            </button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> id</th>
                <th> Nombre</th>
                <th> Apellido</th>
                <th> Numero Documento</th>
                <th> Tipo Documento</th>
                <th> Fecha de Nacimiento</th>
                <th> Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personas.map(persona => (
                <tr key={persona.id}>
                  <td> {persona.id}</td>
                  <td> {persona.nombre}</td>
                  <td> {persona.apellido}</td>
                  <td> {persona.numeroDocumento}</td>
                  <td> {persona.tipoDocumento}</td>
                  <td>
                    {moment(persona.fechaDeNacimiento).format("DD/MM/YYYY ")}
                  </td>
                  <td>
                    <Link
                      to={"/persona/" + persona.id}
                      style={{ color: "#FFF", textDecoration: "none" }}
                    >
                      <Icon
                        style={{ marginRight: 10 }}
                        path={mdiAccountEdit}
                        size={1}
                        color="green"
                      />
                    </Link>

                    <Icon
                      path={mdiDelete}
                      size={1}
                      color="red"
                      onClick={e => this.borrarPersona(persona.id, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

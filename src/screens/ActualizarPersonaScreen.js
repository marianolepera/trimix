import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import Calendar from "react-calendar";
import PersonaServicio from "../servicios/PersonaServicios";
class ActualizarPersonaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nombre: "",
      apellido: "",
      numeroDocumento: "",
      tipoDocumento: "",
      fechaDeNacimiento: "",
      dateState: new Date(),
      personas: [
        {
          nombre: "",
          apellido: "",
          numeroDocumento: "",
          tipoDocumento: "",
          fechaDeNacimiento: ""
        }
      ]
    };
    this.actualizarPersona = this.actualizarPersona.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.agregarPersona = this.agregarPersona.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChangeDate(e) {
    this.setState({ dateState: this.state.dateState });
  }

  cancel() {
    this.props.history.push("/");
  }

  handleChange(e) {
    this.setState({ tipoDocumento: e.target.value });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      console.log("entre al if ");
      PersonaServicio.getPersonaById(this.props.match.params.id).then(res => {
        let persona = res.data;
        this.setState({
          id: this.props.match.params.id,
          nombre: persona.nombre,
          apellido: persona.apellido,
          numeroDocumento: persona.numeroDocumento,
          tipoDocumento: persona.tipoDocumento,
          fechaDeNacimiento: persona.fechaDeNacimiento
        });
      });
    }
  }

  agregarPersona(event) {
    event.preventDefault();
    const persona = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      numeroDocumento: this.state.numeroDocumento,
      tipoDocumento: this.state.tipoDocumento,
      fechaDeNacimiento: this.state.fechaDeNacimiento
    };

    console.log(persona);

    PersonaServicio.crearPersona(persona)
      .then(res => {
        console.log(res);
        console.log(res.data);
        Swal.fire("Se agregó la persona", res.data.mensaje, "success");
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error.response);
        Swal.fire("Hubo un error", "", "error");
        this.props.history.push("/");
      });
  }

  actualizarPersona(event) {
    event.preventDefault();
    const persona = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      numeroDocumento: this.state.numeroDocumento,
      tipoDocumento: this.state.tipoDocumento,
      fechaDeNacimiento: this.state.fechaDeNacimiento
    };

    console.log(persona);
    console.log("entre al actualizar");

    PersonaServicio.actualizarPersona(persona, this.state.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
        Swal.fire("Se actualizo la persona", res.data.mensaje, "success");
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error.response);
        Swal.fire("Hubo un error", "", "error");
        this.props.history.push("/");
      });
  }
  render() {
    return (
      <div>
        {this.props.match.params.id ? (
          <h2> Actualizar Persona </h2>
        ) : (
          <h2> Crear Persona </h2>
        )}
        <div>
          <form
            onSubmit={
              this.props.match.params.id
                ? this.actualizarPersona
                : this.agregarPersona
            }
          >
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  id="nombre"
                  name="nombre"
                  onChange={this.handleInputChange}
                  value={this.state.nombre}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <label>Apellido</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Apellido"
                  id="apellido"
                  name="apellido"
                  onChange={this.handleInputChange}
                  value={this.state.apellido}
                ></input>
              </div>
              <div className="form-group col-md-4">
                <label for="inputPassword4">Numero de Documento</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Numero de Documento"
                  id="numeroDocumento"
                  name="numeroDocumento"
                  onChange={this.handleInputChange}
                  value={this.state.numeroDocumento}
                ></input>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Tipo de documento</label>

                <select
                  id="tipoDocumento"
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
              <div className="form-group col-md-4">
                <label for="inputCity">Fecha de Nacimiento</label>
                <input
                  type="text"
                  className="form-control"
                  id="fechaDeNacimiento"
                  name="fechaDeNacimiento"
                  onChange={this.handleInputChange}
                  value={this.state.fechaDeNacimiento}
                ></input>
              </div>
            </div>

            {this.props.match.params.id ? (
              <button type="submit" class="btn btn-primary">
                Actualizar
              </button>
            ) : (
              <button type="submit" class="btn btn-primary">
                Agregar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={this.cancel}
              style={{ marginLeft: "10px" }}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ActualizarPersonaScreen);

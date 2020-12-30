import axios from "axios";

const Persona_Api = "http://localhost:8080/api/personas";

class PersonaService {
  getPersonas() {
    return axios.get(Persona_Api);
  }

  crearPersona(persona) {
    return axios.post(Persona_Api, persona);
  }

  getPersonaById(personaId) {
    return axios.get(Persona_Api + "/" + personaId);
  }

  actualizarPersona(persona, personaId) {
    return axios.put(Persona_Api + "/" + personaId, persona);
  }

  borrarPersona(personaId) {
    return axios.delete(Persona_Api + "/" + personaId);
  }

  getPersonasByNombre(nombre) {
    return axios.get(Persona_Api + "/nombre/" + nombre);
  }

  getTipoDocumento(tipoDocumento) {
    return axios.get(Persona_Api + "/tipo/" + tipoDocumento);
  }
}

export default new PersonaService();

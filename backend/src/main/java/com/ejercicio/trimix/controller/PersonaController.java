package com.ejercicio.trimix.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ejercicio.trimix.exception.ResourceNotFoundException;
import com.ejercicio.trimix.model.Persona;
import com.ejercicio.trimix.repository.PersonaRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PersonaController {
	@Autowired
	PersonaRepository personaRepository;
	
		// trae todas las personas
		@GetMapping("/personas")
		public List<Persona> getAllPersonas(){
			return personaRepository.findAll();
		}
		
		// trae  personas por nombre
		@GetMapping("/personas/nombre/{nombre}")
		public List<Persona> traerPersonaPorNombre(@PathVariable String nombre){
			return  personaRepository.encontrarPersonaPorNombre(nombre);
		}
		
		// trae  personas por nombre
		@GetMapping("/personas/tipo/{tipoDocumento}")
		public List<Persona> traerTipoDeDocumento(@PathVariable String tipoDocumento){
			return  personaRepository.encontrarTipoDocumento(tipoDocumento);
		}
		
		// crea una persona
		@PostMapping("/personas")
		public Persona createPersona(@RequestBody Persona persona) {
			return personaRepository.save(persona);
		}
		
		//trae una persona por id
		@GetMapping("/personas/{id}")
		public ResponseEntity<Persona> getPersonaById(@PathVariable Long id) {
			Persona persona = personaRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("La persona no existe con el id :" + id));
			return ResponseEntity.ok(persona);
		}
		
		// actualiza una persona
		@PutMapping("/personas/{id}")
		public ResponseEntity<Persona> updatePersona(@PathVariable Long id, @RequestBody Persona personaDetalles){
			Persona persona = personaRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("La persona no existe con el id :" + id));
			
			persona.setNombre(personaDetalles.getNombre());
			persona.setApellido(personaDetalles.getApellido());
			persona.setNumeroDocumento(personaDetalles.getNumeroDocumento());
			persona.setTipoDocumento(personaDetalles.getTipoDocumento());
			persona.setFechaDeNacimiento(personaDetalles.getFechaDeNacimiento());
			
			Persona updatedPersona = personaRepository.save(persona);
			return ResponseEntity.ok(updatedPersona);
		}
		
		// borra una persona
		@DeleteMapping("/personas/{id}")
		public ResponseEntity<Map<String, Boolean>> deletePersona(@PathVariable Long id){
			Persona persona = personaRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("La persona no existe con el id  :" + id));
			
			personaRepository.delete(persona);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		
		
		
		
}

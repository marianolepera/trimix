package com.ejercicio.trimix.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ejercicio.trimix.model.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long>{
	//List<Persona> findByTipoDocumentoContaining(String tipoDocumento);
	//List<Persona> findByName(String nombre);
	
	@Query("select p from Persona p where nombre like ?1")
	  List<Persona> encontrarPersonaPorNombre(String nombre);
	
	@Query("select p from Persona p where tipoDocumento like ?1")
	  List<Persona> encontrarTipoDocumento(String tipoDocumento);

}

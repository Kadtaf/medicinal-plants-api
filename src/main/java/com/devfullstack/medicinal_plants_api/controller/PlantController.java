package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.PlantDTO;
import com.devfullstack.medicinal_plants_api.dto.PlantResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.service.PlantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/plants")
public class PlantController {

    @Autowired
    private PlantService service;


    @GetMapping
    public ResponseEntity<List<PlantResponseDTO>> getAll() {
        List<Plant> plants = service.getAllPlants();
        return ResponseEntity.ok(service.convertToResponseDTO(plants));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<PlantResponseDTO> getById(@PathVariable Long id) {
        Plant plant = service.getPlantById(id);
        return ResponseEntity.ok(service.convertToResponseDTO(plant));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<PlantResponseDTO> createPlant(@Valid @RequestBody PlantDTO dto) {
        Plant saved = service.createPlant(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.convertToResponseDTO(saved));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/id/{id}")
    public ResponseEntity<PlantResponseDTO> update(@PathVariable Long id, @Valid @RequestBody PlantDTO dto) {
        Plant updated = service.updatePlant(id, dto);
        return ResponseEntity.ok(service.convertToResponseDTO(updated));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deletePlant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/season/{season}")
    public ResponseEntity<List<PlantResponseDTO>> getBySeason(@PathVariable String season) {
        List<Plant> plants = service.getPlantsBySeason(season);
        return ResponseEntity.ok(service.convertToResponseDTO(plants));
    }

    @GetMapping("/search")
    public ResponseEntity<PlantResponseDTO> getByName(@RequestParam String name) {
        Plant plant = service.getPlantByName(name);
        return ResponseEntity.ok(service.convertToResponseDTO(plant));
    }


}
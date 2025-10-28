package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.PlantDTO;
import com.devfullstack.medicinal_plants_api.dto.PlantResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.service.PlantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping({"/api/plants", "/api/plants/"})
public class PlantController {

    @Autowired
    private PlantService service;

    /**
     * ✅ Liste paginée + filtrage par nom ou saison
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPaginatedAndFiltered(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String property
    ) {
        Page<Plant> plantPage;
        Pageable pageable = PageRequest.of(page, size);

        // ✅ Priorité au filtre par propriété
        if (property != null && !property.isBlank()) {
            plantPage = service.getPaginatedPlantsByProperty(property, pageable);
        } else if (name != null && !name.isBlank()) {
            plantPage = service.getPaginatedPlantsByName(name, pageable);
        } else if (season != null && !season.isBlank()) {
            plantPage = service.getPaginatedPlantsBySeason(season, pageable);
        } else {
            plantPage = service.getPaginatedPlants(pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("plants", service.convertToResponseDTO(plantPage.getContent()));
        response.put("currentPage", plantPage.getNumber());
        response.put("totalItems", plantPage.getTotalElements());
        response.put("totalPages", plantPage.getTotalPages());

        return ResponseEntity.ok(response);
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
}

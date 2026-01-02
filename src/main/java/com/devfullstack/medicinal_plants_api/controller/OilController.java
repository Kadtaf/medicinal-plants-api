package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.OilResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Oil;
import com.devfullstack.medicinal_plants_api.service.OilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping({"/api/oils", "/api/oils/"})
public class OilController {

    @Autowired
    private OilService oilService;

    /**
     * ✅ Liste paginée + filtrage par nom ou plante
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPaginatedAndFiltered(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String plant,
            @RequestParam(required = false) String benefit // ✅ Ajouté ici
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Oil> oilPage;

        if (name != null && !name.isBlank()) {
            oilPage = oilService.getPaginatedOilsByName(name, pageable);
        } else if (plant != null && !plant.isBlank()) {
            oilPage = oilService.getPaginatedOilsByPlantName(plant, pageable);
        } else if (benefit != null && !benefit.isBlank()) { // ✅ Ajouté ici
            oilPage = oilService.getPaginatedOilsByBenefit(benefit, pageable);
        } else {
            oilPage = oilService.getPaginatedOils(pageable);
        }

        List<OilResponseDTO> dtos = oilService.convertToResponseDTO(oilPage.getContent());

        Map<String, Object> response = new HashMap<>();
        response.put("oils", dtos);
        response.put("currentPage", oilPage.getNumber());
        response.put("totalItems", oilPage.getTotalElements());
        response.put("totalPages", oilPage.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<OilResponseDTO> getById(@PathVariable Long id) {
        Oil oil = oilService.getOilById(id);
        return ResponseEntity.ok(oilService.convertToResponseDTO(oil));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<OilResponseDTO> create(@RequestBody Oil oil) {
        Oil created = oilService.createOil(oil);
        return ResponseEntity.status(HttpStatus.CREATED).body(oilService.convertToResponseDTO(created));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/id/{id}")
    public ResponseEntity<OilResponseDTO> update(@PathVariable Long id, @RequestBody Oil oil) {
        Oil updated = oilService.updateOil(id, oil);
        return ResponseEntity.ok(oilService.convertToResponseDTO(updated));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        oilService.deleteOil(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<List<OilResponseDTO>> getOilsByPlant(@PathVariable Long plantId) {
        List<OilResponseDTO> oils = oilService.getOilsByPlantId(plantId);
        return ResponseEntity.ok(oils);
    }
}
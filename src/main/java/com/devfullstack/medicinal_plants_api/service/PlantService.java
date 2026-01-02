package com.devfullstack.medicinal_plants_api.service;

import com.devfullstack.medicinal_plants_api.dto.OilDTO;
import com.devfullstack.medicinal_plants_api.dto.PlantDTO;
import com.devfullstack.medicinal_plants_api.dto.PlantResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    public List<Plant> getAllPlants(){
        return plantRepository.findAll();
    }

    public Plant getPlantById(Long id){
        return plantRepository.findById(id).orElseThrow(() -> new RuntimeException("Plante non trouvée"));
    }

    public Plant getPlantByName(String name) {
        return plantRepository.findByName(name)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plante non trouvée"));
    }


    public void deletePlant(Long id){
        plantRepository.deleteById(id);
    }

    public List<Plant> getPlantsBySeason(String season){
        return plantRepository.findBySeasonFound(season);
    }

    public Plant updatePlant(Long id, PlantDTO dto) {
        Plant existingPlant = plantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plante non trouvée avec l'ID : " + id));

        existingPlant.setName(dto.getName());
        existingPlant.setOrigin(dto.getOrigin());
        existingPlant.setDescription(dto.getDescription());
        existingPlant.setSeasonFound(dto.getSeasonFound());
        existingPlant.setImageUrl(dto.getImageUrl());
        existingPlant.setAffiliateLink(dto.getAffiliateLink());
        existingPlant.setUses(dto.getUses());
        existingPlant.setProperties(dto.getProperties()); // ✅ ajout ici

        return plantRepository.save(existingPlant);
    }

    public Plant convertToEntity(PlantDTO dto) {
        Plant plant = new Plant();
        plant.setName(dto.getName());
        plant.setOrigin(dto.getOrigin());
        plant.setDescription(dto.getDescription());
        plant.setSeasonFound(dto.getSeasonFound());
        plant.setImageUrl(dto.getImageUrl());
        plant.setAffiliateLink(dto.getAffiliateLink());
        plant.setUses(dto.getUses());
        plant.setProperties(dto.getProperties()); // ✅ ajout ici
        return plant;
    }

    public Plant createPlant(PlantDTO dto) {
        Plant plant = convertToEntity(dto);
        return plantRepository.save(plant);
    }

    public PlantResponseDTO convertToResponseDTO(Plant plant) {
        OilDTO oilDTO = null;
        if (plant.getOil() != null) {
            oilDTO = new OilDTO(
                    plant.getOil().getId(),
                    plant.getOil().getName(),
                    plant.getOil().getDescription(),
                    plant.getOil().getBenefits(),
                    plant.getOil().getPrecautions(),
                    plant.getOil().getImageUrl(),
                    plant.getOil().getAffiliateLink()
            );
        }

        return new PlantResponseDTO(
                plant.getId(),
                plant.getName(),
                plant.getOrigin(),
                plant.getDescription(),
                plant.getSeasonFound(),
                plant.getImageUrl(),
                plant.getAffiliateLink(),
                plant.getUses(),
                plant.getProperties(),
                oilDTO // ✅ Ajout ici
        );
    }

    public List<PlantResponseDTO> convertToResponseDTO(List<Plant> plants) {
        return plants.stream()
                .map(this::convertToResponseDTO)
                .toList(); // Java 16+ ; sinon utilise .collect(Collectors.toList())
    }

    public Page<Plant> getPaginatedPlants(Pageable pageable) {
        return plantRepository.findAll(pageable);
    }

    public Page<Plant> getPaginatedPlantsByName(String name, Pageable pageable) {
        return plantRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Plant> getPaginatedPlantsBySeason(String season, Pageable pageable) {
        return plantRepository.findBySeasonFoundContainingIgnoreCase(season, pageable);
    }

    public Page<Plant> getPaginatedPlantsByProperty(String property, Pageable pageable) {
        return plantRepository.findByPropertiesContainingIgnoreCase(property, pageable);
    }
}

package com.devfullstack.medicinal_plants_api.service;

import com.devfullstack.medicinal_plants_api.dto.OilResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Oil;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.repositories.OilRepository;
import com.devfullstack.medicinal_plants_api.repositories.PlantRepository;
import org.springdoc.core.parsers.ReturnTypeParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class OilService {

    @Autowired
    private OilRepository oilRepository;

    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private ReturnTypeParser returnTypeParser;

    // 🔄 Méthodes paginées
    public Page<Oil> getPaginatedOils(Pageable pageable) {
        return oilRepository.findAll(pageable);
    }

    public Page<Oil> getPaginatedOilsByName(String name, Pageable pageable) {
        return oilRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Oil> getPaginatedOilsByPlantName(String plantName, Pageable pageable) {
        return oilRepository.findByPlant_NameContainingIgnoreCase(plantName, pageable);
    }

    // 🔄 Méthodes non paginées (pour compatibilité)
    public List<Oil> getAllOils() {
        return oilRepository.findAll();
    }

    public List<Oil> searchByName(String name) {
        return oilRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Oil> searchByPlantName(String plantName) {
        return oilRepository.findByPlant_NameContainingIgnoreCase(plantName);
    }

    // 🔄 CRUD
    public Oil getOilById(Long id) {
        return oilRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Huile introuvable"));
    }

    public Oil createOil(Oil oil) {
        if (oil.getPlant() != null && oil.getPlant().getId() != null) {
            Plant plant = plantRepository.findById(oil.getPlant().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plante associée introuvable"));
            oil.setPlant(plant);
        }
        return oilRepository.save(oil);
    }

    public Oil updateOil(Long id, Oil oil) {
        Oil existing = getOilById(id);

        // 🔹 Mise à jour des champs simples
        if (oil.getName() != null) existing.setName(oil.getName());
        if (oil.getDescription() != null) existing.setDescription(oil.getDescription());
        if (oil.getBenefits() != null) existing.setBenefits(oil.getBenefits());
        if (oil.getPrecautions() != null) existing.setPrecautions(oil.getPrecautions());
        if (oil.getImageUrl() != null) existing.setImageUrl(oil.getImageUrl());
        if (oil.getAffiliateLink() != null) existing.setAffiliateLink(oil.getAffiliateLink());

        // 🔹 Mise à jour de la plante associée (si elle change)
        if (oil.getPlant() != null && oil.getPlant().getId() != null) {
            Long newPlantId = oil.getPlant().getId();
            Long currentPlantId = existing.getPlant() != null ? existing.getPlant().getId() : null;

            if (!Objects.equals(newPlantId, currentPlantId)) {
                Plant plant = plantRepository.findById(newPlantId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plante associée introuvable"));

                if (plant.getOil() != null && !plant.getOil().getId().equals(existing.getId())) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Cette plante est déjà liée à une huile essentielle.");
                }

                existing.setPlant(plant);
            }
        }

        return oilRepository.save(existing);
    }

    public void deleteOil(Long id) {
        oilRepository.delete(getOilById(id));
    }

    // 🔄 Conversion DTO
    public OilResponseDTO convertToResponseDTO(Oil oil) {
        String plantName = (oil.getPlant() != null) ? oil.getPlant().getName() : null;
        Long plantId = (oil.getPlant() != null) ? oil.getPlant().getId() : null;
        Plant plant = oil.getPlant();
        String plantImageUrl = (plant != null) ? plant.getImageUrl() : null;


        return new OilResponseDTO(
                oil.getId(),
                oil.getName(),
                oil.getDescription(),
                oil.getBenefits(),
                oil.getPrecautions(),
                oil.getImageUrl(),
                oil.getAffiliateLink(),
                plantName,
                plantId,
                plantImageUrl

        );
    }

    public List<OilResponseDTO> convertToResponseDTO(List<Oil> oils) {
        return oils.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public Page<Oil> getPaginatedOilsByBenefit(String benefit, Pageable pageable) {
        return oilRepository.findByBenefitsContainingIgnoreCase(benefit, pageable);
    }

    public List<OilResponseDTO> getOilsByPlantId(Long plantId) {
        List<Oil> oils = oilRepository.findByPlantId(plantId);
        return oils.stream()
                .map(oil -> new OilResponseDTO(
                        oil.getId(),
                        oil.getName(),
                        oil.getDescription(),
                        oil.getBenefits(),
                        oil.getPrecautions(),
                        oil.getImageUrl(),
                        oil.getAffiliateLink(),
                        oil.getPlant().getName(),
                        oil.getPlant().getId(),
                        oil.getPlant().getImageUrl() // si tu as ajouté plantImageUrl
                ))
                .collect(Collectors.toList());
    }
}
package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.OilImageDTO;
import com.devfullstack.medicinal_plants_api.repositories.OilRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OilImageController {

    private final OilRepository oilRepository;

    public OilImageController(OilRepository oilRepository) {
        this.oilRepository = oilRepository;
    }

    @GetMapping("/api/oil-images")
    public List<OilImageDTO> getOilImages() {
        return oilRepository.findAll().stream()
                .map(oil -> new OilImageDTO(oil.getName(), oil.getImageUrl()))
                .filter(dto -> dto.getUrl() != null && !dto.getUrl().isBlank())
                .collect(Collectors.toList());
    }
}
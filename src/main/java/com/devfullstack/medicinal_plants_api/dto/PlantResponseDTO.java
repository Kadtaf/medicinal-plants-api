package com.devfullstack.medicinal_plants_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantResponseDTO {
    private Long id;
    private String name;
    private String origin;
    private String description;
    private String seasonFound;
    private String imageUrl;
    private String affiliateLink;
    private Set<String> uses = new HashSet<>();
    private List<String> properties;




}

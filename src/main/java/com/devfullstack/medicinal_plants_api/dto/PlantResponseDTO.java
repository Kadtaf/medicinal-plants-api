package com.devfullstack.medicinal_plants_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}

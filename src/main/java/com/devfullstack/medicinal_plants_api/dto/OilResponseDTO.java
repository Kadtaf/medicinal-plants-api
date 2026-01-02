package com.devfullstack.medicinal_plants_api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OilResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String benefits;
    private String precautions;
    private String imageUrl;
    private String affiliateLink;
    private String plantName;
    private Long plantId;//Ajout récent
    private String plantImageUrl;//Ajout récent

    public OilResponseDTO(Long id, String name, String description, String benefits,
                          String precautions, String imageUrl, String affiliateLink,
                          String plantName, Long plantId, String plantImageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.benefits = benefits;
        this.precautions = precautions;
        this.imageUrl = imageUrl;
        this.affiliateLink = affiliateLink;
        this.plantName = plantName;
        this.plantId = plantId;
        this.plantImageUrl = plantImageUrl;
    }

}

package com.devfullstack.medicinal_plants_api.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OilDTO {
    private Long id;
    private String name;
    private String description;
    private String benefits;
    private String precautions;
    private String imageUrl;
    private String affiliateLink;

   // private Long plantId;
    private PlantDTO plant;

    // Constructeur
    public OilDTO(Long id, String name, String description, String benefits,
                  String precautions, String imageUrl, String affiliateLink) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.benefits = benefits;
        this.precautions = precautions;
        this.imageUrl = imageUrl;
        this.affiliateLink = affiliateLink;
    }


}

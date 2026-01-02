package com.devfullstack.medicinal_plants_api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class PlantResponseDTO implements Serializable {

    private Long id;
    private String name;
    private String origin;
    private String description;
    private String seasonFound;
    private String imageUrl;
    private String affiliateLink;
    private Set<String> uses = new HashSet<>();
    private List<String> properties = new ArrayList<>();
    private OilDTO oil; // ✅ Ajouté pour enrichir la réponse

    // ✅ Constructeur utilisé dans les tests
    public PlantResponseDTO(Long id, String name, String origin, String description,
                            String seasonFound, String imageUrl) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.description = description;
        this.seasonFound = seasonFound;
        this.imageUrl = imageUrl;
    }

    // ✅ Constructeur complet pour la conversion DTO
    public PlantResponseDTO(Long id, String name, String origin, String description, String seasonFound,
                            String imageUrl, String affiliateLink, Set<String> uses, List<String> properties, OilDTO oil) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.description = description;
        this.seasonFound = seasonFound;
        this.imageUrl = imageUrl;
        this.affiliateLink = affiliateLink;
        this.uses = uses;
        this.properties = properties;
        this.oil = oil;
    }

}
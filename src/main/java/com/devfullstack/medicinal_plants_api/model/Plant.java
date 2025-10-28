package com.devfullstack.medicinal_plants_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String origin;

    private String description;

    private String seasonFound;

    private String imageUrl;

    @Column(length = 500)
    private String affiliateLink; // 🔗 Lien vers produit affilié (tisane bio, etc.)

    @ElementCollection
    private Set<String> uses = new HashSet<>(); // 🌿 Ex: "Infusion", "Décoction", "Gélule"

    @ElementCollection
    @CollectionTable(name = "plant_properties", joinColumns = @JoinColumn(name = "plant_id"))
    @Column(name = "property")
    private List<String> properties = new ArrayList<>();

    public Plant(String name, String origin, String description, String seasonFound, String imageUrl) {
        this.name = name;
        this.origin = origin;
        this.description = description;
        this.seasonFound = seasonFound;
        this.imageUrl = imageUrl;
    }
}
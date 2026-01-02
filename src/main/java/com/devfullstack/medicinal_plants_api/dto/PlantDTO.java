package com.devfullstack.medicinal_plants_api.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false, unique = true)
    private String name;

    @NotBlank(message = "L'origine est obligatoire")
    @Size(max = 255, message = "L'origine ne doit pas dépasser 255 caractères")
    private String origin;

    @Size(max = 1000, message = "La description ne doit pas dépasser 1000 caractères")
    private String description;

    @NotBlank(message = "La saison est obligatoire")
    private String seasonFound;

    @NotBlank(message = "L'URL de l'image est obligatoire")
    @URL(message = "L'URL de l'image doit être valide")
    private String imageUrl;

    private String affiliateLink;

    @Size(max = 10, message = "Maximum 10 formes d’usage")
    private Set<String> uses;

    @Size(max = 20, message = "Maximum 20 propriétés médicinales")
    private List<String> properties;
}
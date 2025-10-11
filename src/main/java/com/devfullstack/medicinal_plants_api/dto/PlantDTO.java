package com.devfullstack.medicinal_plants_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantDTO {

    @NotBlank(message = "Le nom est obligatoire")
    private String name;

    @NotBlank(message = "L'origine est obligatoire")
    @Size(max = 255)
    private String origin;

    @Size(max = 1000)
    private String description;

    @NotBlank(message = "La saison est obligatoire")
    private String seasonFound;

    @URL(message = "L'URL de l'image doit être valide")
    private String imageUrl;
}
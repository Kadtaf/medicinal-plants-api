package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.PlantResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.service.PlantService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(PlantController.class) // 🧪 Test uniquement le contrôleur PlantController
public class PlantControllerTest {

    @Autowired
    private MockMvc mockMvc; // 🎯 Simule les requêtes HTTP

    @MockBean
    private PlantService plantService; // 🧪 Mock du service injecté dans le contrôleur

    @Test
    public void testGetAllPlants() throws Exception {
        // Données simulées
        Plant plant1 = new Plant(1L, "Menthe", "Plante digestive", "https://image.com/menthe.jpg", "Europe", "Été");
        Plant plant2 = new Plant(2L, "Camomille", "Plante apaisante", "https://image.com/camomille.jpg", "Asie", "Printemps");

        // Simulation du comportement du service
        when(plantService.getAllPlants()).thenReturn(List.of(plant1, plant2));
        when(plantService.convertToResponseDTO(List.of(plant1, plant2))).thenReturn(List.of(
                new PlantResponseDTO(1L, "Menthe", "Plante digestive", "https://image.com/menthe.jpg", "Europe", "Été"),
                new PlantResponseDTO(2L, "Camomille", "Plante apaisante", "https://image.com/camomille.jpg", "Asie", "Printemps")
        ));

        // Envoie une requête GET vers /api/plants
        mockMvc.perform(get("/api/plants"))
                .andExpect(status().isOk()) // ✅ Vérifie que le statut est 200
                .andExpect(jsonPath("$.length()").value(2)) // ✅ Vérifie qu'on reçoit 2 plantes
                .andExpect(jsonPath("$[0].name").value("Menthe")) // ✅ Vérifie le nom de la première plante
                .andExpect(jsonPath("$[1].name").value("Camomille")); // ✅ Vérifie le nom de la deuxième plante
    }

    @Test
    public void testCreatePlant_success() throws Exception {
        // 🧪 Données d'entrée simulées (DTO)
        String jsonPayload = """
        {
            "name": "Romarin",
            "origin": "Méditerranée",
            "description": "Plante tonique",
            "seasonFound": "Printemps",
            "imageUrl": "https://image.com/romarin.jpg"
        }
    """;

        // 🧪 Objet simulé retourné par le service
        Plant savedPlant = new Plant(1L, "Romarin", "Méditerranée", "Plante tonique", "Printemps", "https://image.com/romarin.jpg");
        PlantResponseDTO responseDTO = new PlantResponseDTO(1L, "Romarin", "Méditerranée", "Plante tonique", "Printemps", "https://image.com/romarin.jpg");

        // 🎯 Simulation du comportement du service
        when(plantService.createPlant(any())).thenReturn(savedPlant);
        when(plantService.convertToResponseDTO(savedPlant)).thenReturn(responseDTO);

        // 🚀 Envoie une requête POST avec le JSON
        mockMvc.perform(post("/api/plants")
                        .contentType("application/json")
                        .content(jsonPayload))
                .andExpect(status().isCreated()) // ✅ 201 CREATED
                .andExpect(jsonPath("$.name").value("Romarin"))
                .andExpect(jsonPath("$.origin").value("Méditerranée"));
    }
}
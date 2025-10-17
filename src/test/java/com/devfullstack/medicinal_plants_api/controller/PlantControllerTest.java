package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.config.SecurityConfig;
import com.devfullstack.medicinal_plants_api.dto.PlantResponseDTO;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.service.PlantService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.security.test.context.support.WithMockUser;


@Import(PlantControllerTest.TestSecurityConfig.class)
@WebMvcTest(PlantController.class) // 🧪 Test uniquement le contrôleur PlantController
public class PlantControllerTest {

    @TestConfiguration
    @EnableWebSecurity
    static class TestSecurityConfig {
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                    .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                    .csrf(csrf -> csrf.disable());
            return http.build();
        }
    }


    @Autowired
    private MockMvc mockMvc; // Simule les requêtes HTTP

    @MockBean
    private PlantService plantService; // Mock du service injecté dans le contrôleur

    @WithMockUser(username = "user", roles = {"USER"})
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

    @WithMockUser(username = "admin", roles = {"ADMIN"})
    @Test
    public void testCreatePlant_success() throws Exception {
        // Données d'entrée simulées (DTO)
        String jsonPayload = """
        {
            "name": "Romarin",
            "origin": "Méditerranée",
            "description": "Plante tonique",
            "seasonFound": "Printemps",
            "imageUrl": "https://image.com/romarin.jpg"
        }
    """;

        // Objet simulé retourné par le service
        Plant savedPlant = new Plant(1L, "Romarin", "Méditerranée", "Plante tonique", "Printemps", "https://image.com/romarin.jpg");
        PlantResponseDTO responseDTO = new PlantResponseDTO(1L, "Romarin", "Méditerranée", "Plante tonique", "Printemps", "https://image.com/romarin.jpg");

        // Simulation du comportement du service
        when(plantService.createPlant(any())).thenReturn(savedPlant);
        when(plantService.convertToResponseDTO(savedPlant)).thenReturn(responseDTO);

        // Envoie une requête POST avec le JSON
        mockMvc.perform(post("/api/plants")
                        .contentType("application/json")
                        .content(jsonPayload))
                .andExpect(status().isCreated()) // ✅ 201 CREATED
                .andExpect(jsonPath("$.name").value("Romarin"))
                .andExpect(jsonPath("$.origin").value("Méditerranée"));
    }

    @WithMockUser(username = "admin", roles = {"ADMIN"})
    @Test
    public void testUpdatePlant_success() throws Exception {
        // Payload JSON simulé pour mise à jour
        String updatePayload = """
        {
            "name": "Romarin modifié",
            "origin": "Méditerranée",
            "description": "Plante tonique modifiée",
            "seasonFound": "Été",
            "imageUrl": "https://image.com/romarin-new.jpg"
        }
    """;

        // Objet simulé retourné par le service après mise à jour
        Plant updatedPlant = new Plant(1L, "Romarin modifié", "Méditerranée", "Plante tonique modifiée", "Été", "https://image.com/romarin-new.jpg");
        PlantResponseDTO responseDTO = new PlantResponseDTO(1L, "Romarin modifié", "Méditerranée", "Plante tonique modifiée", "Été", "https://image.com/romarin-new.jpg");

        // Simulation du comportement du service
        when(plantService.updatePlant(eq(1L), any())).thenReturn(updatedPlant);
        when(plantService.convertToResponseDTO(updatedPlant)).thenReturn(responseDTO);

        // Envoie une requête PUT vers /api/plants/id/1
        mockMvc.perform(put("/api/plants/id/1")
                        .contentType("application/json")
                        .content(updatePayload))
                .andExpect(status().isOk()) // ✅ 200 OK
                .andExpect(jsonPath("$.name").value("Romarin modifié"))
                .andExpect(jsonPath("$.seasonFound").value("Été"));
    }
}
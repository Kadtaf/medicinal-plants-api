package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.config.JwtAuthFilter;
import com.devfullstack.medicinal_plants_api.config.JwtUtil;
import com.devfullstack.medicinal_plants_api.dto.PlantResponseDTO;
import com.devfullstack.medicinal_plants_api.dto.PlantDTO;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.service.PlantService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;


import java.util.List;
import java.util.Set;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(controllers = PlantController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class PlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlantService plantService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private JwtAuthFilter jwtAuthFilter;

    @WithMockUser(username = "user", roles = {"ROLE-USER"})
    @Test
    public void testGetAllPlants() throws Exception {
        Plant plant1 = new Plant("Menthe", "Europe", "Plante digestive", "Été", "https://image.com/menthe.jpg");
        plant1.setId(1L);
        Plant plant2 = new Plant("Camomille", "Asie", "Plante apaisante", "Printemps", "https://image.com/camomille.jpg");
        plant2.setId(2L);

        Page<Plant> mockPage = new PageImpl<>(List.of(plant1, plant2));

        PlantResponseDTO dto1 = new PlantResponseDTO(1L, "Menthe", "Europe", "Plante digestive", "Été", "https://image.com/menthe.jpg");
        dto1.setAffiliateLink("https://aroma-zone.com/menthe");
        dto1.setUses(Set.of("Infusion"));
        dto1.setProperties(List.of("Digestive"));

        PlantResponseDTO dto2 = new PlantResponseDTO(2L, "Camomille", "Asie", "Plante apaisante", "Printemps", "https://image.com/camomille.jpg");
        dto2.setAffiliateLink("https://aroma-zone.com/camomille");
        dto2.setUses(Set.of("Décoction"));
        dto2.setProperties(List.of("Apaisante"));

        when(plantService.getPaginatedPlants(any(Pageable.class))).thenReturn(mockPage);
        when(plantService.convertToResponseDTO(anyList())).thenReturn(List.of(dto1, dto2));
        System.out.println("Mock page content: " + mockPage.getContent());
        mockMvc.perform(get("/api/plants"))
                .andDo(print())
                .andDo(result -> {
                    String json = result.getResponse().getContentAsString();
                    System.out.println("✅ JSON response: " + json);
                })
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.plants.length()").value(2))
                .andExpect(jsonPath("$.plants[0].name").value("Menthe"))
                .andExpect(jsonPath("$.plants[1].name").value("Camomille"))
                .andExpect(jsonPath("$.totalItems").value(2));
    }

    @Autowired
    private ObjectMapper objectMapper;

    @WithMockUser(username = "admin", roles = {"ROLE-ADMIN"})
    @Test
    public void testCreatePlant_success() throws Exception {
        PlantDTO dto = new PlantDTO();
        dto.setName("Romarin");
        dto.setOrigin("Méditerranée");
        dto.setDescription("Plante tonique");
        dto.setSeasonFound("Printemps");
        dto.setImageUrl("https://image.com/romarin.jpg");
        dto.setAffiliateLink("https://aroma-zone.com/romarin");
        dto.setUses(Set.of("Infusion", "Gélule"));
        dto.setProperties(List.of("Tonique", "Digestive"));

        String jsonPayload = objectMapper.writeValueAsString(dto);

        PlantResponseDTO responseDTO = new PlantResponseDTO(1L, "Romarin", "Méditerranée", "Plante tonique", "Printemps", "https://image.com/romarin.jpg");
        responseDTO.setAffiliateLink("https://aroma-zone.com/romarin");
        responseDTO.setUses(Set.of("Infusion", "Gélule"));
        responseDTO.setProperties(List.of("Tonique", "Digestive"));

        // The service.createPlant(...) returns a Plant; return a Plant instance and stub conversion to DTO
        Plant createdPlant = new Plant("Romarin", "Méditerranée", "Plante tonique", "Printemps", "https://image.com/romarin.jpg");
        createdPlant.setId(1L);

        when(plantService.createPlant(any(PlantDTO.class))).thenReturn(createdPlant);
        when(plantService.convertToResponseDTO(any(Plant.class))).thenReturn(responseDTO);

        mockMvc.perform(post("/api/plants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Romarin"))
                .andExpect(jsonPath("$.origin").value("Méditerranée"));
    }

    @WithMockUser(username = "admin", roles = {"ADMIN"})
    @Test
    public void testDeletePlant_success() throws Exception {
        Long plantId = 1L;
        doNothing().when(plantService).deletePlant(plantId);

        mockMvc.perform(delete("/api/plants/id/{id}", plantId))
                .andDo(print())
                .andExpect(status().isNoContent());

        verify(plantService, times(1)).deletePlant(plantId);
    }

    @WithMockUser(username = "user", roles = {"USER"})
    @Test
    public void testGetPlantById_success() throws Exception {
        // Données simulées
        Long plantId = 1L;
        Plant plant = new Plant("Aloe Vera", "Afrique du Nord", "Hydratante", "Été", "https://image.com/aloe.jpg");
        plant.setId(plantId);

        PlantResponseDTO responseDTO = new PlantResponseDTO(
                plantId,
                "Aloe Vera",
                "Afrique du Nord",
                "Hydratante",
                "Été",
                "https://image.com/aloe.jpg"
        );
        responseDTO.setAffiliateLink("https://aroma-zone.com/aloe");
        responseDTO.setUses(Set.of("Gel"));
        responseDTO.setProperties(List.of("Hydratante"));

        // Mocks
        when(plantService.getPlantById(plantId)).thenReturn(plant);
        when(plantService.convertToResponseDTO(any(Plant.class))).thenReturn(responseDTO);
        System.out.println("✅ DTO mock: " + responseDTO);
        // Exécution + vérifications
        mockMvc.perform(get("/api/plants/id/{id}", plantId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Aloe Vera"))
                .andExpect(jsonPath("$.origin").value("Afrique du Nord"))
                .andExpect(jsonPath("$.description").value("Hydratante"))
                .andExpect(jsonPath("$.seasonFound").value("Été"))
                .andExpect(jsonPath("$.imageUrl").value("https://image.com/aloe.jpg"))
                .andExpect(jsonPath("$.affiliateLink").value("https://aroma-zone.com/aloe"))
                .andExpect(jsonPath("$.uses[0]").value("Gel"))
                .andExpect(jsonPath("$.properties[0]").value("Hydratante"));
    }


}
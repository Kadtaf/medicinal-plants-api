package com.devfullstack.medicinal_plants_api.repositories;


import com.devfullstack.medicinal_plants_api.model.Oil;
import com.devfullstack.medicinal_plants_api.model.Plant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@DataJpaTest
public class OilRepositoryTest {

    @Autowired
    private OilRepository oilRepository;

    @Autowired
    private PlantRepository plantRepository;

    private Plant lavender;
    private Oil lavenderOil;

    @BeforeEach
    void setUp() {
        lavender = new Plant();
        lavender.setName("Lavande");
        lavender.setOrigin("France");
        lavender.setDescription("Plante apaisante");
        lavender.setSeasonFound("Été");
        lavender.setImageUrl("lavande.jpg");
        lavender.setAffiliateLink("https://amazon.fr/lavande");
        lavender.setUses(Collections.singleton("Tisane, Infusion"));
        lavender.setProperties(Collections.singletonList("Calmante,Relaxation"));

        plantRepository.save(lavender);

        lavenderOil = new Oil();
        lavenderOil.setName("Huile de lavande");
        lavenderOil.setDescription("Huile essentielle relaxante");
        lavenderOil.setBenefits("Sommeil, stress");
        lavenderOil.setPrecautions("Ne pas utiliser chez les enfants");
        lavenderOil.setImageUrl("huile-lavande.jpg");
        lavenderOil.setAffiliateLink("https://amazon.fr/huile-lavande");
        lavenderOil.setPlant(lavender);

        oilRepository.save(lavenderOil);
    }

    @Test
    void testFindByNameContainingIgnoreCase() {
        List<Oil> results = oilRepository.findByNameContainingIgnoreCase("lavande");
        assertThat(results).isNotEmpty();
        assertThat(results.get(0).getName()).containsIgnoringCase("lavande");
    }

    @Test
    void testFindByPlantNameContainingIgnoreCase() {
        List<Oil> results = oilRepository.findByPlant_NameContainingIgnoreCase("lavande");
        assertThat(results).isNotEmpty();
        assertThat(results.get(0).getPlant().getName()).containsIgnoringCase("lavande");
    }

    @Test
    void testFindByNameContainingIgnoreCasePaginated() {
        var page = oilRepository.findByNameContainingIgnoreCase("lavande", PageRequest.of(0, 5));
        assertThat(page.getContent()).isNotEmpty();
        assertThat(page.getTotalElements()).isGreaterThan(0);
    }

    @Test
    void testFindByPlantNameContainingIgnoreCasePaginated() {
        var page = oilRepository.findByPlant_NameContainingIgnoreCase("lavande", PageRequest.of(0, 5));
        assertThat(page.getContent()).isNotEmpty();
        assertThat(page.getTotalElements()).isGreaterThan(0);
    }
}

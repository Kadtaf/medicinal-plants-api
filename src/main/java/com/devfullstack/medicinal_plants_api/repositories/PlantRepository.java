package com.devfullstack.medicinal_plants_api.repositories;

import com.devfullstack.medicinal_plants_api.model.Plant;
import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;
import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    Page<Plant> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Plant> findBySeasonFoundContainingIgnoreCase(String season, Pageable pageable);

    List<Plant> findBySeasonFound(String season);

    Optional<Plant> findByName(String name);

    Page<Plant> findByPropertiesContainingIgnoreCase(String property, Pageable pageable);

    @EntityGraph(attributePaths = {"oil"})
    List<Plant> findAll();


    Optional<Plant> findByNameIgnoreCase(@NotBlank String name);


}


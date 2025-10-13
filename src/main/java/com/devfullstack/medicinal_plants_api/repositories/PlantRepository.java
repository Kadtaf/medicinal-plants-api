package com.devfullstack.medicinal_plants_api.repositories;

import com.devfullstack.medicinal_plants_api.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;
import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findBySeasonFound(String season);

    Optional<Plant> findByName(String name);


}


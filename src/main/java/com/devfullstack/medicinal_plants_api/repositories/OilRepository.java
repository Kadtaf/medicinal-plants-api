package com.devfullstack.medicinal_plants_api.repositories;

import com.devfullstack.medicinal_plants_api.model.Oil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OilRepository extends JpaRepository<Oil, Long> {

    // 🔍 Recherche non paginée
    List<Oil> findByNameContainingIgnoreCase(String name);
    List<Oil> findByPlant_NameContainingIgnoreCase(String plantName);

    // 🔍 Recherche paginée
    Page<Oil> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Oil> findByPlant_NameContainingIgnoreCase(String plantName, Pageable pageable);

    Optional<Oil> findByNameIgnoreCase(String oilName);

    Page<Oil> findByBenefitsContainingIgnoreCase(String benefit, Pageable pageable);

    List<Oil> plantId(Long plantId);

    List<Oil> findByPlantId(Long plantId);
}
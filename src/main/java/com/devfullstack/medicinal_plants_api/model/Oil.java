package com.devfullstack.medicinal_plants_api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "oils")
@ToString(exclude = "plant")
public class Oil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(length = 1000)
    private String benefits;

    @Column(length = 1000)
    private String precautions;

    private String imageUrl;
    private String affiliateLink;

    // 🔗 Relation 1:1 avec Plant (chaque huile correspond à une seule plante)
    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "plant_id", unique = true)
    private Plant plant;


}

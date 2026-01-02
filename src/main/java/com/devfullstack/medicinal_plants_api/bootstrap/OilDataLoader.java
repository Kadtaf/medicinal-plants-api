package com.devfullstack.medicinal_plants_api.bootstrap;

import com.devfullstack.medicinal_plants_api.model.Oil;
import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.repositories.OilRepository;
import com.devfullstack.medicinal_plants_api.repositories.PlantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Order(2)
public class OilDataLoader implements CommandLineRunner {

    private final OilRepository oilRepository;
    private final PlantRepository plantRepository;

    public OilDataLoader(OilRepository oilRepository, PlantRepository plantRepository) {
        this.oilRepository = oilRepository;
        this.plantRepository = plantRepository;
    }

    @Override
    public void run(String... args) {
        if (oilRepository.count() > 0) {
            System.out.println("ℹ️ Huiles essentielles déjà chargées, aucun rechargement effectué.");
            return;
        }

        System.out.println("💧 Chargement initial des huiles essentielles...");

        createOilForPlant("Aloe Vera", "Huile d’Aloe Vera",
                "Hydratante, apaisante et régénérante.",
                "Cicatrisation, brûlures, soins capillaires, hydratation cutanée.",
                "Éviter l’application sur une peau très grasse.",
                "/img/MH_aloe_vera_B.avif",
                "https://www.amazon.fr/dp/B0C8R1ALOE");

        createOilForPlant("Camomille", "Huile essentielle de Camomille",
                "Calmante et anti-inflammatoire, idéale pour les peaux sensibles.",
                "Stress, coliques, irritations cutanées, troubles du sommeil.",
                "À éviter pendant la grossesse et l’allaitement.",
                "/img/HE-camomille-Bio.avif",
                "https://www.amazon.fr/dp/B0C8R1CAMO");

        createOilForPlant("Menthe poivrée", "Huile essentielle de Menthe poivrée",
                "Tonique, stimulante et rafraîchissante.",
                "Digestion, migraines, nausées, fatigue mentale.",
                "Ne pas utiliser chez l’enfant ni la femme enceinte.",
                "/img/HE-menthe-poiv-Bio.avif",
                "https://www.amazon.fr/dp/B0C8R1MENT");

        createOilForPlant("Gingembre", "Huile essentielle de Gingembre",
                "Tonique, réchauffante et stimulante de la circulation.",
                "Fatigue, troubles digestifs, douleurs articulaires.",
                "À utiliser diluée sur la peau.",
                "/img/HE_gingembre_B.avif",
                "https://www.amazon.fr/dp/B0C8R1GING");

        createOilForPlant("Thym", "Huile essentielle de Thym",
                "Antiseptique puissant, renforce les défenses immunitaires.",
                "Infections respiratoires, fatigue, immunité faible.",
                "Ne pas utiliser pure sur la peau.",
                "/img/HE_thym_a_thuj-Bio.avif",
                "https://www.amazon.fr/dp/B0C8R1THYM");

        createOilForPlant("Lavande", "Huile essentielle de Lavande",
                "Relaxante, cicatrisante et anti-stress.",
                "Stress, insomnie, brûlures, piqûres, anxiété.",
                "À éviter en cas d’allergie connue.",
                "/img/HE_lavande_bio.avif",
                "https://www.amazon.fr/dp/B0C8R1LAV");

        createOilForPlant("Eucalyptus", "Huile essentielle d’Eucalyptus",
                "Antibactérienne, expectorante et respiratoire.",
                "Rhumes, toux, sinusites, encombrement bronchique.",
                "Déconseillée chez les enfants de moins de 3 ans.",
                "/img/HE-Eucalyptus-Bio.avif",
                "https://www.amazon.fr/dp/B0C8R1EUC");

        createOilForPlant("Romarin", "Huile essentielle de Romarin",
                "Stimulante, tonifiante et détoxifiante pour le foie.",
                "Fatigue mentale, digestion lente, douleurs musculaires.",
                "Déconseillée chez les épileptiques.",
                "/img/HE_romarin_bio.avif",
                "https://www.amazon.fr/dp/B0C8R1ROM");

        System.out.println("✅ Huiles essentielles correctement liées aux plantes !");
    }

    private void createOilForPlant(String plantName, String oilName, String description, String benefits,
                                   String precautions, String imageUrl, String affiliateLink) {

        Optional<Plant> optionalPlant = plantRepository.findByNameIgnoreCase(plantName);

        if (optionalPlant.isEmpty()) {
            System.out.println("⚠️ Plante introuvable pour : " + plantName);
            return;
        }

        Plant plant = optionalPlant.get();

        // 🔒 Éviter les doublons (vérifie si une huile existe déjà pour cette plante)
        Optional<Oil> existingOil = oilRepository.findByNameIgnoreCase(oilName);
        if (existingOil.isPresent()) {
            System.out.println("ℹ️ " + oilName + " existe déjà, aucun ajout.");
            return;
        }

        Oil oil = new Oil();
        oil.setName(oilName);
        oil.setDescription(description);
        oil.setBenefits(benefits);
        oil.setPrecautions(precautions);
        oil.setImageUrl(imageUrl);
        oil.setAffiliateLink(affiliateLink);
        oil.setPlant(plant);

        oilRepository.save(oil);
        System.out.println("💧 " + oilName + " liée à la plante : " + plantName);
    }

}

package com.devfullstack.medicinal_plants_api.bootstrap;

import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.repositories.PlantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.*;
@Order(1)
@Component
public class DataLoader implements CommandLineRunner {

    private final PlantRepository plantRepository;

    public DataLoader(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Override
    public void run(String... args) {
        // ⚠️ Évite les doublons : on vérifie si les données existent déjà
        if (plantRepository.count() >= 8) {
            System.out.println("ℹ️ Données déjà présentes, aucun rechargement effectué");
            return;
        }

        System.out.println("🌱 Chargement initial des plantes...");

        List<Plant> plants = new ArrayList<>();

        plants.add(createPlant(
                "Aloe Vera", "Afrique du Nord",
                "Plante médicinale connue pour ses propriétés cicatrisantes et hydratantes.",
                "Été",
                "https://cdn.pixabay.com/photo/2017/08/10/14/40/aloe-vera-2623317_1280.jpg",
                Set.of("Gel", "Crème", "Jus"),
                List.of("Hydratante", "Cicatrisante", "Apaisante")
        ));

        plants.add(createPlant(
                "Camomille", "Europe",
                "Utilisée pour ses effets calmants et digestifs.",
                "Printemps",
                "https://cdn.pixabay.com/photo/2024/05/15/07/59/flowers-8763039_1280.jpg",
                Set.of("Infusion", "Huile essentielle"),
                List.of("Calmante", "Digestive")
        ));

        plants.add(createPlant(
                "Menthe poivrée", "Méditerranée",
                "Plante aromatique aux vertus digestives et rafraîchissantes.",
                "Été",
                "https://cdn.pixabay.com/photo/2017/06/12/19/23/moroccan-mint-2396530_1280.jpg",
                Set.of("Infusion", "Huile essentielle"),
                List.of("Digestive", "Antinauséeuse", "Rafraîchissante")
        ));

        plants.add(createPlant(
                "Gingembre", "Asie du Sud",
                "Racine stimulante utilisée contre les nausées et pour renforcer l’immunité.",
                "Hiver",
                "https://cdn.pixabay.com/photo/2016/10/13/15/50/ginger-1738098_1280.jpg",
                Set.of("Poudre", "Infusion"),
                List.of("Antioxydante", "Stimulante", "Digestive")
        ));

        plants.add(createPlant(
                "Thym", "Europe du Sud",
                "Antiseptique naturel utilisé contre les infections respiratoires.",
                "Automne",
                "https://cdn.pixabay.com/photo/2013/06/01/03/07/thyme-115348_1280.jpg",
                Set.of("Infusion", "Huile essentielle"),
                List.of("Antiseptique", "Antitussive", "Tonifiante")
        ));

        plants.add(createPlant(
                "Lavande", "Provence",
                "Plante relaxante utilisée en aromathérapie et pour apaiser les douleurs.",
                "Été",
                "https://cdn.pixabay.com/photo/2016/01/02/00/42/lavender-1117275_1280.jpg",
                Set.of("Huile essentielle", "Sachet parfumé"),
                List.of("Relaxante", "Antispasmodique", "Apaisante")
        ));

        plants.add(createPlant(
                "Eucalyptus", "Australie",
                "Plante expectorante utilisée pour dégager les voies respiratoires.",
                "Hiver",
                "https://cdn.pixabay.com/photo/2017/09/03/17/33/eucalyptus-2711285_1280.jpg",
                Set.of("Inhalation", "Huile essentielle"),
                List.of("Antiseptique", "Expectorante")
        ));

        plants.add(createPlant(
                "Romarin", "Bassin méditerranéen",
                "Stimulant circulatoire et tonique digestif.",
                "Printemps",
                "https://cdn.pixabay.com/photo/2020/06/04/14/52/rosemary-5259098_1280.jpg",
                Set.of("Infusion", "Huile essentielle"),
                List.of("Stimulante", "Digestive", "Antioxydante")
        ));

        // 🔄 Supprime les doublons avant d’insérer (par nom)
        for (Plant p : plants) {
            plantRepository.findByNameIgnoreCase(p.getName())
                    .ifPresentOrElse(
                            existing -> System.out.println("⚠️ " + p.getName() + " déjà en base, ignorée."),
                            () -> plantRepository.save(p)
                    );
        }

        System.out.println("✅ Chargement initial terminé !");
    }

    /**
     * Crée un objet Plant avec ses propriétés et usages.
     */
    private Plant createPlant(String name, String origin, String description, String seasonFound,
                              String imageUrl, Set<String> uses, List<String> properties) {
        Plant p = new Plant(name, origin, description, seasonFound, imageUrl);
        p.setUses(new HashSet<>(uses));
        p.setProperties(new ArrayList<>(properties));
        return p;
    }
}

package com.devfullstack.medicinal_plants_api.bootstrap;

import com.devfullstack.medicinal_plants_api.model.Plant;
import com.devfullstack.medicinal_plants_api.repositories.PlantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final PlantRepository plantRepository;

    public DataLoader(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Override
    public void run(String... args) {
        if (plantRepository.count() == 0) {
            plantRepository.saveAll(List.of(
                    new Plant("Aloe Vera", "Afrique du Nord", "Plante médicinale connue pour ses propriétés cicatrisantes et hydratantes.", "Été", "https://cdn.pixabay.com/photo/2017/08/10/14/40/aloe-vera-2623317_1280.jpg"),
                    new Plant("Camomille", "Europe", "Utilisée pour ses effets calmants et digestifs.", "Printemps", "https://cdn.pixabay.com/photo/2024/05/15/07/59/flowers-8763039_1280.jpg"),
                    new Plant("Menthe poivrée", "Méditerranée", "Plante aromatique aux vertus digestives et rafraîchissantes.", "Été", "https://cdn.pixabay.com/photo/2017/06/12/19/23/moroccan-mint-2396530_1280.jpg"),
                    new Plant("Gingembre", "Asie du Sud", "Racine stimulante utilisée contre les nausées et pour renforcer l’immunité.", "Hiver", "https://cdn.pixabay.com/photo/2016/10/13/15/50/ginger-1738098_1280.jpg"),
                    new Plant("Thym", "Europe du Sud", "Antiseptique naturel utilisé contre les infections respiratoires.", "Automne", "https://cdn.pixabay.com/photo/2013/06/01/03/07/thyme-115348_1280.jpg"),
                    new Plant("Lavande", "Provence", "Plante relaxante utilisée en aromathérapie et pour apaiser les douleurs.", "Été", "https://cdn.pixabay.com/photo/2016/01/02/00/42/lavender-1117275_1280.jpg"),
                    new Plant("Eucalyptus", "Australie", "Plante expectorante utilisée pour dégager les voies respiratoires.", "Hiver", "https://cdn.pixabay.com/photo/2017/09/03/17/33/eucalyptus-2711285_1280.jpg"),
                    new Plant("Romarin", "Bassin méditerranéen", "Stimulant circulatoire et tonique digestif.", "Printemps", "https://cdn.pixabay.com/photo/2020/06/04/14/52/rosemary-5259098_1280.jpg")
            ));
            System.out.println("✅ Plantes initiales chargées");
        } else {
            System.out.println("ℹ️ Plantes déjà présentes, aucun chargement effectué");
        }
    }
}

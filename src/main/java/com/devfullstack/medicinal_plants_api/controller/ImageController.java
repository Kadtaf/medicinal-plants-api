package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.ImageDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @GetMapping
    public List<ImageDTO> getAllImages() {
        return List.of(
                new ImageDTO("Passiflora", "https://cdn.pixabay.com/photo/2018/06/10/10/43/passion-flower-3466146_1280.jpg"),
                new ImageDTO("Camomille", "https://cdn.pixabay.com/photo/2024/05/15/07/59/flowers-8763039_1280.jpg"),
                new ImageDTO("Menthe poivrée", "https://cdn.pixabay.com/photo/2017/06/12/19/23/moroccan-mint-2396530_1280.jpg"),
                new ImageDTO("Thym", "https://cdn.pixabay.com/photo/2013/06/01/03/07/thyme-115348_1280.jpg"),
                new ImageDTO("Aloe vera", "https://cdn.pixabay.com/photo/2017/08/10/14/40/aloe-vera-2623317_1280.jpg"),
                new ImageDTO("Gingembre", "https://cdn.pixabay.com/photo/2016/10/13/15/50/ginger-1738098_1280.jpg"),
                new ImageDTO("Lavande", "https://cdn.pixabay.com/photo/2016/01/02/00/42/lavender-1117275_1280.jpg"),
                new ImageDTO("Eucalyptus", "https://cdn.pixabay.com/photo/2017/09/03/17/33/eucalyptus-2711285_1280.jpg"),
                new ImageDTO("Romarin", "https://cdn.pixabay.com/photo/2020/06/04/14/52/rosemary-5259098_1280.jpg"),
                new ImageDTO("Pensée sauvage", "https://cdn.pixabay.com/photo/2013/01/09/14/57/pansy-74455_1280.jpg"),
                new ImageDTO("Maté", "https://cdn.pixabay.com/photo/2020/06/15/09/23/green-tea-5301025_1280.jpg"),
                new ImageDTO("Girofle", "https://cdn.pixabay.com/photo/2015/11/18/17/32/cloves-1049598_1280.jpg"),
                new ImageDTO("Gymnema", "https://cdn.pixabay.com/photo/2022/07/14/19/23/gymea-leaves-7321833_1280.jpg"),
                new ImageDTO("Pissenlit", "https://cdn.pixabay.com/photo/2023/05/22/14/49/dandelion-8010882_1280.jpg"),
                new ImageDTO("Reine des près", "https://cdn.pixabay.com/photo/2020/05/16/11/15/garden-meadowsweet-5177069_1280.jpg"),
                new ImageDTO("Sauge", "https://cdn.pixabay.com/photo/2015/09/14/10/24/sage-939368_1280.jpg"),
                new ImageDTO("Trèfle rouge", "https://cdn.pixabay.com/photo/2016/09/10/17/59/blossom-1659814_1280.jpg"),
                new ImageDTO("Géranim rosat", "https://cdn.pixabay.com/photo/2016/06/06/12/04/geranium-1439280_1280.jpg")

                // Ajoute ici les autres images
        );
    }
}







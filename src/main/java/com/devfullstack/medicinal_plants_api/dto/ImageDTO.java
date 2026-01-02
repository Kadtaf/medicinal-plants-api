package com.devfullstack.medicinal_plants_api.dto;


import lombok.Data;
@Data
public class ImageDTO {
    private final String name;
    private final String url;

    public ImageDTO(String name, String url) {
        this.name = name;
        this.url = url;
    }

}

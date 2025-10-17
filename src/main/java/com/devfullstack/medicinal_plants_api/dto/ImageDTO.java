package com.devfullstack.medicinal_plants_api.dto;


public class ImageDTO {
    private String name;
    private String url;

    public ImageDTO(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }
}

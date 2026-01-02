package com.devfullstack.medicinal_plants_api.dto;

import lombok.Data;


@Data
public class OilImageDTO {
    private String name;
    private String url;

    public OilImageDTO() {}

    public OilImageDTO(String name, String url) {
        this.name = name;
        this.url = url;
    }


}
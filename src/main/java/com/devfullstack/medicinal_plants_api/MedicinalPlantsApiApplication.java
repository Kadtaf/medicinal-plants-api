package com.devfullstack.medicinal_plants_api;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MedicinalPlantsApiApplication {

	public static void main(String[] args) {
        String hash = new BCryptPasswordEncoder().encode("Momo123");
        System.out.println("Mot de passe encodé : " + hash);

        SpringApplication.run(MedicinalPlantsApiApplication.class, args);
	}


}

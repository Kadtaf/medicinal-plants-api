package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.dto.LoginRequest;
import com.devfullstack.medicinal_plants_api.config.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // ===============================
    // 🔐 LOGIN ENDPOINT
    // ===============================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("\n===============================");
        System.out.println("🔑 Tentative de connexion pour : " + request.getUsername());
        System.out.println("===============================");

        try {
            // 1️⃣ Authentification via Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            // 2️⃣ Récupération de l'utilisateur authentifié
            User user = (User) authentication.getPrincipal();

            // 3️⃣ Extraction du rôle complet ("ROLE_ADMIN" / "ROLE_USER")
            String fullRole = user.getAuthorities().stream()
                    .findFirst()
                    .map(a -> a.getAuthority())
                    .orElse("ROLE_USER");

            System.out.println("✅ Authentification réussie !");
            System.out.println("👤 Utilisateur : " + user.getUsername());
            System.out.println("🎭 Rôle : " + fullRole);

            // 4️⃣ Génération du token JWT
            String token = jwtUtil.generateToken(user.getUsername(), fullRole);
            System.out.println("🔑 Token généré (début) : " + token.substring(0, 40) + "...");

            // 5️⃣ Réponse structurée pour le frontend
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Connexion réussie ✅");
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("role", fullRole);

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            System.err.println("❌ Échec d'authentification : " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Identifiants invalides ❌"));
        }
    }
}

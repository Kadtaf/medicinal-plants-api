package com.devfullstack.medicinal_plants_api.service;

import com.devfullstack.medicinal_plants_api.model.User;
import com.devfullstack.medicinal_plants_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ============================================================
    // 🟢 CREATE USER
    // ============================================================
    public User createUser(User user) {
        // 🔍 Vérification des doublons
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Nom d'utilisateur déjà pris");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email déjà utilisé");
        }

        // ✅ Normalisation du rôle
        normalizeRoles(user);

        // ✅ Encodage unique du mot de passe (BCrypt)
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 💾 Sauvegarde
        User savedUser = userRepository.save(user);

        System.out.println("👤 Nouvel utilisateur créé : " + savedUser.getUsername());
        System.out.println("🎭 Rôles enregistrés : " + savedUser.getRoles());
        return savedUser;
    }

    // ============================================================
    // 🟡 READ USERS
    // ============================================================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    // ============================================================
    // 🟠 UPDATE USER
    // ============================================================
    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);

        // ✅ Mise à jour des champs autorisés
        if (user.getUsername() != null && !user.getUsername().isBlank()) {
            existingUser.setUsername(user.getUsername());
        }

        if (user.getEmail() != null && !user.getEmail().isBlank()) {
            existingUser.setEmail(user.getEmail());
        }

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            normalizeRoles(user);
            existingUser.setRoles(user.getRoles());
        }

        User updated = userRepository.save(existingUser);
        System.out.println("✏️ Utilisateur mis à jour : " + updated.getUsername());
        return updated;
    }

    // ============================================================
    // 🔴 DELETE USER
    // ============================================================
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
        System.out.println("🗑️ Utilisateur supprimé : " + user.getUsername());
    }

    // ============================================================
    // 🧩 UTILITIES
    // ============================================================
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    /**
     * ✅ Assure que tous les rôles sont préfixés par "ROLE_"
     */
    private void normalizeRoles(User user) {
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(Set.of("ROLE_USER")); // Rôle par défaut
        } else {
            user.setRoles(
                    user.getRoles().stream()
                            .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role)
                            .collect(Collectors.toSet())
            );
        }
    }

    public List<User> searchByUsername(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username);
    }
}

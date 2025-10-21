package com.devfullstack.medicinal_plants_api.controller;

import com.devfullstack.medicinal_plants_api.model.User;
import com.devfullstack.medicinal_plants_api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // 🧩 Liste de tous les utilisateurs → ADMIN uniquement
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🧩 Récupérer un utilisateur par ID → ADMIN uniquement
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 🧩 Rechercher un utilisateur par username → ADMIN uniquement
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    // 🧩 Créer un nouvel utilisateur → ADMIN uniquement
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User createUser(@Valid @RequestBody User user) {

        return userService.createUser(user);
    }

    // 🧩 Modifier un utilisateur → ADMIN uniquement
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    // 🧩 Supprimer un utilisateur → ADMIN uniquement
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

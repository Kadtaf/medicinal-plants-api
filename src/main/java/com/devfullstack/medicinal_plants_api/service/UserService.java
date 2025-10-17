package com.devfullstack.medicinal_plants_api.service;


import com.devfullstack.medicinal_plants_api.model.User;
import com.devfullstack.medicinal_plants_api.repositories.UserRepository;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("ID non trouvé"));
    }

    public User getUserByUsername(String name){
        return userRepository.findByUsername(name).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }



    public User updateUser(Long id,User user){
        User exsistingUser = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvée avec son " + id));

        if (user.getUsername() == null || user.getUsername().trim().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le nom d'utilisateur ne peut pas être vide");
        }

        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if (optionalUser.isPresent() && !optionalUser.get().getId().equals(id)){
            throw new ResponseStatusException(HttpStatus.CONFLICT, " Ce nom d'utilisateur est déjà utilisé");
        }
        exsistingUser.setUsername(user.getUsername());

        return userRepository.save(exsistingUser);
    }

    public void deleteUser(Long id){
        User exsexsistingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé avec l'id" + id));
        userRepository.delete(exsexsistingUser);
    }


    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}

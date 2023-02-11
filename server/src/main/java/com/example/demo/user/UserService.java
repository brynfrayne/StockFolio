package com.example.demo.user;

import com.example.demo.asset.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssetRepository assetRepository;

    public void updateUser(User user, String userEmail) {
        Optional<User> userByEmail = userRepository.findUserByEmail(userEmail);
        if (!userByEmail.isPresent()) {
            throw new IllegalStateException("User with email " + userEmail + " does not exist");
        }
        User retrievedUser = userByEmail.get();
        if (user.getFirstName() != null) {
            retrievedUser.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            retrievedUser.setLastName(user.getLastName());
        }
        if (user.getEmail() != null) {
            retrievedUser.setEmail(user.getEmail());
        }
        if (user.getPassword() != null) {
            retrievedUser.setPassword(user.getPassword());
        }
        userRepository.save(retrievedUser);
    }

    public UserDetails getUser(String userEmail) {
        Optional<User> userByEmail = userRepository.findUserByEmail(userEmail);
        if (!userByEmail.isPresent()) {
            throw new IllegalStateException("User with email " + userEmail + " does not exist");
        }
        User retrievedUser = userByEmail.get();
        return retrievedUser;
    }
}

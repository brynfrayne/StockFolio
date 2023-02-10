package com.example.demo.user;

import com.example.demo.asset.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> getUserByEmail(String userEmail) {
        return userRepository.findUserByEmail(userEmail);
    }

    public void updateUser(User user, String userEmail) {}

    public List<User> getUsers() {
        System.out.println("get users");
        return userRepository.findAll();
    }
//        Optional<User> userByEmail = userRepository.findUserByEmail(userEmail);
//        if (!userByEmail.isPresent()) {
//            throw new IllegalStateException("User with email " + userEmail + " does not exist");
//        }
//
//        }


//    }
}

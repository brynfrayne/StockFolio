package com.example.demo.user;

import com.example.demo.asset.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssetRepository assetRepository;
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

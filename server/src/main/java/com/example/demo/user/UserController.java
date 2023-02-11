package com.example.demo.user;

import com.example.demo.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtService jwtService;

    @GetMapping
    public UserDetails getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
//        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
        UserDetails userDetails = userService.getUser(userEmail);
        return userDetails;
    }

    @PutMapping
    public void updateUser(@RequestBody User user) {
        System.out.println("is this where the error is?");
        System.out.println("user: " + user);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        System.out.println("userEmail: " + userEmail);
        userService.updateUser(user, userEmail);
    }

}

package com.example.demo.user;

import com.example.demo.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

//    public UserController(UserService userService) {
//        this.userService = userService;
//    }

    @GetMapping
    public UserDetails getUserByEmail(@RequestHeader("Authorization") String token) {
        String userEmail = jwtService.parseToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
        return userDetails;
    }
//    @GetMapping
//    public List<User> getUsers() {
//        return userService.getUsers();
//    }


    @PutMapping
    public void updateUser(@RequestBody User user, @RequestHeader("Authorization") String token) {
        String userEmail = jwtService.parseToken(token);
        userService.updateUser(user, userEmail);
    }

}

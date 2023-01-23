package com.example.MyPortfolioApplication.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public String user() {
        return "Hello User";
    }

    @PostMapping("/user")
    public String userPost() {
        return "Hello User";
    }

}

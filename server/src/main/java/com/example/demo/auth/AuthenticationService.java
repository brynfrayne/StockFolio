package com.example.demo.auth;

import com.example.demo.asset.AssetService;
import com.example.demo.config.JwtService;
import com.example.demo.user.Role;
import com.example.demo.user.UserRepository;
import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AssetService assetService;

    public AuthenticationResponse register(RegisterRequest request) {
        try {
            var existingUser = repository.findByEmail(request.getEmail());
            if (existingUser.isPresent()) {
                throw new IllegalArgumentException(
                        "A user with the email '" + request.getEmail() + "' already exists"
                );
            }


            var encodedPassword = passwordEncoder.encode(request.getPassword());
            var user = User.builder()
                    .email(request.getEmail())
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .cashBalance(10000.00)
                    .password(encodedPassword)
                    .role(Role.USER)
                    .build();
            repository.save(user);
            int expiresIn = 60 * 60 * 24 * 7; // 7 days
            var jwtToken = jwtService.generateToken(user, expiresIn);
            ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                    .httpOnly(true)
                    .maxAge(expiresIn)
                    .path("/")
                    .build();
            return AuthenticationResponse.builder()
                    .message("User registered successfully")
                    .token(jwtToken)
//                    .cookie(cookie)
                    .status(HttpStatus.OK)
                    .build();
        }

        catch(IllegalArgumentException e) {
            return AuthenticationResponse.builder()
                    .message(e.getMessage())
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            var user = repository.findByEmail(request.getEmail())
                    .orElseThrow();


            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            int expiresIn = 60 * 60 * 24 * 7; // 7 days
            var jwtToken = jwtService.generateToken(user, expiresIn);
            ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                    .httpOnly(true)
                    .maxAge(expiresIn)
                    .path("/")
                    .build();

            return AuthenticationResponse.builder()
                    .token(jwtToken)
//                    .cookie(cookie)
                    .status(HttpStatus.OK)
                    .build();
        } catch (NoSuchElementException | BadCredentialsException e) {
            System.out.println("Authentication failed");

            String message;
            if (e instanceof NoSuchElementException) {
                message = "Email not found";
            } else {
                message = "Incorrect password";
            }

            return AuthenticationResponse.builder()
                    .message(message)
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }
    }
}

package com.example.demo.sampleportfolio;

import com.example.demo.asset.Asset;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static java.time.Month.JANUARY;

@Configuration
public class SampleAssetConfig {

    @Bean
    CommandLineRunner commandLineRunner(SampleAssetRepository repository, UserRepository userRepository) {
        return args -> {
            User demoUser = new User(
                    1L,
                    "johndoe@abc.com",
                    "abc",
                    "John",
                    "Doe",
                    10000.00,
                    LocalDateTime.now(),
                    Role.USER
            );
            userRepository.save(demoUser);

            SampleAsset apple = new SampleAsset(
                    1L,
                    "Apple",
                    "AAPL",
                    10,
                    23.50F,
                    21.12F,
                    LocalDate.of(2022, JANUARY, 23),
                    demoUser
            );
            double balanceAfterApple = demoUser.getCashBalance() - (apple.getAssetQuantity() * apple.getAssetCostBasis());

            if (balanceAfterApple < 0) {
                System.out.println("Insufficient funds to purchase asset.");
            } else {
                demoUser.setCashBalance(balanceAfterApple);
                userRepository.save(demoUser);
            }

            SampleAsset tesla = new SampleAsset(
                    2L,
                    "Tesla",
                    "TSLA",
                    23,
                    14.50F,
                    21.12F,
                    LocalDate.of(2022, JANUARY, 23),
                    demoUser
            );

            double balanceAfterTesla = demoUser.getCashBalance() - (tesla.getAssetQuantity() * tesla.getAssetCostBasis());
            if (balanceAfterTesla < 0) {
                System.out.println("Insufficient funds to purchase asset.");
            } else {
                demoUser.setCashBalance(balanceAfterTesla);
                userRepository.save(demoUser);
            }

            repository.saveAll(
                    List.of(apple, tesla)
            );
        };
    }
}

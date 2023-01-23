package com.example.demo.asset;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

import static java.time.Month.*;

@Configuration
public class AssetConfig {
    @Bean
    CommandLineRunner commandLineRunner(AssetRepository repository) {
        return args -> {
            Asset apple = new Asset(
                    "Apple",
                    "Stock",
                    10,
                    23.50F,
                    21.12F,
                    LocalDate.of(2022, JANUARY, 23)
            );
            Asset tesla = new Asset(
                    "Tesla",
                    "Stock",
                    23,
                    14.50F,
                    21.12F,
                    LocalDate.of(2022, JANUARY, 23)
            );
            repository.saveAll(
                    List.of(apple, tesla)
            );
        };
    }
}

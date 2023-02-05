package com.example.demo.sampleportfolio;

import com.example.demo.asset.Asset;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

import static java.time.Month.JANUARY;

@Configuration
public class SampleAssetConfig {

    @Bean
    CommandLineRunner commandLineRunner(SampleAssetRepository repository) {
        return args -> {
            SampleAsset apple = new SampleAsset(
                    "Apple",
                    "Stock",
                    10,
                    23.50F,
                    21.12F,
                    LocalDate.of(2022, JANUARY, 23)
            );
            SampleAsset tesla = new SampleAsset(
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

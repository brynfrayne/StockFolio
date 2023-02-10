package com.example.demo.sampleportfolio;

import com.example.demo.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name= "Sample_Portfolio")
public class SampleAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "portfolio_seq_gen")
    @SequenceGenerator(name = "portfolio_seq_gen", sequenceName = "portfolio_seq", allocationSize = 1)
    private long id;

    @NotBlank
    private String name; // name of asset
    @NotBlank
    private String ticker; // ticker of asset
    @Positive
    private int assetQuantity; // number of shares of specific asset
    @Positive
    private double assetCostBasis; // cost basis of asset
    @Positive
    private double currentAssetPrice; // current price of asset
    @NotNull
    private LocalDate datePurchased; // date asset was purchased

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
package com.example.demo.asset;

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
@Table(name= "Portfolio")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "portfolio_seq_gen")
    @SequenceGenerator(name = "portfolio_seq_gen", sequenceName = "portfolio_seq", allocationSize = 1)
    private long id;
    private String name;
    private String type;
    private int assetQuantity;
    private double currentAssetPrice;
    private double assetCostBasis;
    @Transient
    private double currentTotalValue;
    @Transient
    private double totalCostBasis;
    @Transient
    private double percentGain;
    private LocalDate datePurchased;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
}
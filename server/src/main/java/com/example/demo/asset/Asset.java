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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
    @NotBlank
    private String name;
    @NotBlank
    private String ticker;
    @Positive
    private int assetQuantity;
    @Positive
    private double currentAssetPrice;
    @Positive
    private double assetCostBasis;
    @ElementCollection
    private List<LocalDate> datePurchased;
    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    public void addPurchaseDate(LocalDate purchaseDate) {
        datePurchased.add(purchaseDate);
    }
    public LocalDate getPurchaseDate(int index) {
        return datePurchased.get(index);
    }
}

package com.example.demo.sampleportfolio;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

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
    private String type; // stock, bond, mutual fund, cash etc.
    @Positive
    private int assetQuantity; // number of shares of specific asset
    @Positive
    private double currentAssetPrice; // current price of asset
    @PositiveOrZero
    private double assetCostBasis; // share price paid for asset

    @PositiveOrZero
    @Transient
    private double currentTotalValue; // current price of asset * number of shares
    @PositiveOrZero
    @Transient
    private double totalCostBasis; // share price paid for asset * number of shares
    @PositiveOrZero
    @Transient
    private double percentGain; // (currentTotalValue - totalCostBasis) / totalCostBasis
    @NotNull
    private LocalDate datePurchased; // date asset was purchased

//    @ManyToOne
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User user;


    public SampleAsset() {
    }

    public SampleAsset(long id,
                 String name,
                 String type,
                 int assetQuantity,
                 Float currentAssetPrice,
                 Float assetCostBasis,
                 LocalDate datePurchased) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.assetQuantity = assetQuantity;
        this.currentAssetPrice = currentAssetPrice;
        this.assetCostBasis = assetCostBasis;
        this.datePurchased = datePurchased;
    }

    public SampleAsset(String name,
                 String type,
                 int assetQuantity,
                 Float currentAssetPrice,
                 Float assetCostBasis,
                 LocalDate datePurchased) {
        this.name = name;
        this.type = type;
        this.assetQuantity = assetQuantity;
        this.currentAssetPrice = currentAssetPrice;
        this.assetCostBasis = assetCostBasis;
        this.datePurchased = datePurchased;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getAssetQuantity() {
        return assetQuantity;
    }

    public void setAssetQuantity(int assetQuantity) {
        this.assetQuantity = assetQuantity;
    }

    public double getCurrentAssetPrice() {
        return currentAssetPrice;
    }

    public void setCurrentAssetPrice(double currentAssetPrice) {
        this.currentAssetPrice = currentAssetPrice;
    }

    public double getAssetCostBasis() {
        return assetCostBasis;
    }

    public void setAssetCostBasis(double assetCostBasis) {
        this.assetCostBasis = assetCostBasis;
    }

    public double getCurrentTotalValue() {
        return currentAssetPrice*assetQuantity;
    }

    public void setCurrentTotalValue(double currentTotalValue) {
        this.currentTotalValue = currentTotalValue;
    }

    public double getTotalCostBasis() {
        return assetCostBasis*assetQuantity;
    }

    public void setTotalCostBasis(double totalCostBasis) {
        this.totalCostBasis = totalCostBasis;
    }

    public double getPercentGain() {
        return (currentAssetPrice-assetCostBasis)/assetCostBasis;
    }

    public void setPercentGain(double percentGain) {
        this.percentGain = percentGain;
    }

    public LocalDate getDatePurchased() {
        return datePurchased;
    }

    public void setDatePurchased(LocalDate datePurchased) {
        this.datePurchased = datePurchased;
    }


    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", assetQuantity=" + assetQuantity +
                ", currentAssetPrice=" + currentAssetPrice +
                ", assetCostBasis=" + assetCostBasis +
                ", currentTotalValue=" + currentTotalValue +
                ", totalCostBasis=" + totalCostBasis +
                ", percentGain=" + percentGain +
                ", datePurchased=" + datePurchased +
                '}';
    }
}
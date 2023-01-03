package myspringportfolio.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Entity
public class Asset {
    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    private String name; // name of asset
    @NotBlank
    private String type; // stock, bond, mutual fund, etc.
    @Positive
    private int assetQuantity; // number of shares of specific asset
    @Positive
    private float currentAssetPrice; // current price of asset
    @PositiveOrZero
    private float assetCostBasis; // share price paid for asset
    @PositiveOrZero
    private float currentTotalValue; // current price of asset * number of shares
    @PositiveOrZero
    private float totalCostBasis; // share price paid for asset * number of shares
    @PositiveOrZero
    private float percentGain; // (currentTotalValue - totalCostBasis) / totalCostBasis
    @NotNull
    private LocalDate datePurchased; // date asset was purchased

    @ManyToOne
    private Portfolio portfolio;

    // Getters and setters for the fields go here...
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

    public float getCurrentAssetPrice() {
        return currentAssetPrice;
    }

    public void setCurrentAssetPrice(float currentAssetPrice) {
        this.currentAssetPrice = currentAssetPrice;
    }

    public float getAssetCostBasis() {
        return assetCostBasis;
    }

    public void setAssetCostBasis(float assetCostBasis) {
        this.assetCostBasis = assetCostBasis;
    }

    public float getCurrentTotalValue() {
        currentTotalValue = currentAssetPrice * assetQuantity;
        return currentTotalValue;
    }

    public void setCurrentTotalValue(float currentTotalValue) {
        this.currentTotalValue = currentTotalValue;
    }

    public float getTotalCostBasis() {
        totalCostBasis = assetCostBasis * assetQuantity;
        return totalCostBasis;
    }

    public void setTotalCostBasis(float totalCostBasis) {
        this.totalCostBasis = totalCostBasis;
    }

    public float getPercentGain() {
        return percentGain;
    }

    public void setPercentGain(float percentGain) {
        this.percentGain = percentGain;
    }

    public LocalDate getDatePurchased() {
        return datePurchased;
    }

    public void setDatePurchased(LocalDate datePurchased) {
        this.datePurchased = datePurchased;
    }
}

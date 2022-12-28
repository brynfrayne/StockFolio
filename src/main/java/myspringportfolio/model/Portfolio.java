package myspringportfolio.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import java.time.LocalDate;
import java.util.List;


@Entity
public class Portfolio {
    @Id
    @GeneratedValue
    private long id;

    private String name;
    private String type;
    private int assetQuantity;
    private float currentAssetPrice;
    private float assetCostBasis;
    private float currentTotalValue;
    private float totalCostBasis;
    private float percentGain;
    private LocalDate datePurchased;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private List<Asset> assets;

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
        return currentTotalValue;
    }

    public void setCurrentTotalValue(float currentTotalValue) {
        this.currentTotalValue = currentTotalValue;
    }

    public float getTotalCostBasis() {
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

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }
}

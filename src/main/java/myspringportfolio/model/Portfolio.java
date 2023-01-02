package myspringportfolio.model;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;


@Entity
public class Portfolio {

    private String tableName;
    // private String owner;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL)
    private List<Asset> assets;

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    // commenting out owner as the initial application will only support one user

    // public String getOwner() {
    //     return owner;
    // }

    // public void setOwner(String owner) {
    //     this.owner = owner;
    // }
}

package myspringportfolio.repository;
import myspringportfolio.model.Asset;
import java.util.List;
import org.springframework.stereotype.Repository;
@Repository
public interface AssetRepository {
    List<Asset> findAll();
    Asset findByName(String name, long userId);
    Asset update(Asset asset);
    Asset save(Asset asset);
    void delete(Asset asset);
}

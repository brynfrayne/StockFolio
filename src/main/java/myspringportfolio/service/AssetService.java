package myspringportfolio.service;
import myspringportfolio.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import myspringportfolio.repository.AssetRepository;
import org.springframework.stereotype.Service;
import java.util.List;




@Service
public class AssetService {
  private final AssetRepository assetRepository;

  public AssetService(AssetRepository assetRepository) {
    this.assetRepository = assetRepository;
  }

  public List<Asset> getAllAssets() {
    return assetRepository.findAll();
  }

  public Asset getAssetByName(String name) {
    return assetRepository.findByName(name);
  }

  public Asset addAsset(Asset asset) {
    return assetRepository.save(asset);
  }

  public Asset updateAsset(Asset asset) {
    return assetRepository.update(asset);
  }

  public void deleteAsset(Asset asset) {
    assetRepository.delete(asset);
  }
}

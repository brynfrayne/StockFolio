package myspringportfolio.repository;

@Service
public class AssetService {
  private final AssetRepository assetRepository;

  public AssetService(AssetRepository assetRepository) {
    this.assetRepository = assetRepository;
  }

  public List<Asset> getAllAssets() {
    return assetRepository.findAll();
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

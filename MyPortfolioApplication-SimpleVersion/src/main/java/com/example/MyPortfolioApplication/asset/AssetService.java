package com.example.MyPortfolioApplication.asset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAssets() {
        return assetRepository.findAll();
    }

    public void addNewAsset(Asset asset) {
        Optional<Asset> assetByNameAndType = assetRepository.findAssetByNameAndType(asset.getName(), asset.getType());

        if (assetByNameAndType.isPresent()) {
            throw new IllegalStateException("asset already exists. add to preexisting asset");
        }
        assetRepository.save(asset);
    }

    public void deleteAsset(Long assetId) {
        boolean exists = assetRepository.existsById(assetId);
        if (!exists) {
            throw new IllegalStateException(
                    "asset with id " + assetId + " does not exist");
        }
        assetRepository.deleteById(assetId);
    }

    @Transactional
    public void updateAsset(Long assetId, Integer assetQuantity, String name) {
        System.out.println(assetQuantity);
        System.out.println(name);
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(()->new IllegalStateException(
                        "asset with id " + assetId + " does not exist"));
//        if (name != null &&
//                name.length() > 0 &&
//                !Objects.equals(asset.getName(), name)) {
//            asset.setName(name);
//        }

        if (assetQuantity != null &&
                assetQuantity > 0 &&
                !Objects.equals(asset.getAssetQuantity(), assetQuantity)) {
            asset.setAssetQuantity(assetQuantity);
        }
    }
}
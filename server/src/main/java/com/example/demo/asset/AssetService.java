package com.example.demo.asset;

import com.example.demo.config.JwtService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private JwtService jwtService;
    private final UserRepository userRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository,
                        UserRepository userRepository) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    public List<Asset> getAssets() {
        return assetRepository.findAll();
    }

    public void addNewAsset(Asset asset, String userEmail) {
        Optional<Asset> assetByName = assetRepository.findAssetByName(asset.getName());

        if (assetByName.isPresent()) {
            throw new IllegalStateException("Asset already exists. Add to pre-existing asset.");
        }

        Optional<User> user = userRepository.findByEmail(userEmail);
        if (!user.isPresent()) {
            throw new IllegalStateException("User with email " + userEmail + " does not exist");
        }

        if (user.get().getCashBalance() < asset.getAssetQuantity() * asset.getCurrentAssetPrice()) {
            throw new IllegalStateException("User does not have enough cash to purchase asset");
        }

        user.get().setCashBalance(user.get().getCashBalance() - asset.getAssetQuantity() * asset.getCurrentAssetPrice());
        asset.setUser(user.get());
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

        if (assetQuantity != null &&
                assetQuantity > 0 &&
                !Objects.equals(asset.getAssetQuantity(), assetQuantity)) {
            asset.setAssetQuantity(assetQuantity);
        }
    }

    public List<Asset> getAssetsByEmail(String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        return assetRepository.findAllByUser(user);
    }
}


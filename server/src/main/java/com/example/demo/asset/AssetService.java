package com.example.demo.asset;

import com.example.demo.config.JwtService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private JwtService jwtService;
    private final UserRepository userRepository;
    private final UserService userService;


    @Autowired
    public AssetService(AssetRepository assetRepository,
                        UserRepository userRepository, UserService userService) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
        this.userService = userService;
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

    public void deleteAsset(Long assetId, Double assetPrice, String userEmail) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new IllegalStateException("Asset does not exist"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException("User with email " + userEmail + " does not exist"));
        user.setCashBalance(user.getCashBalance() + asset.getAssetQuantity() * assetPrice);
        userRepository.save(user);
        assetRepository.deleteById(assetId);
    }
    public List<Asset> getAssetsByEmail(String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        return assetRepository.findAllByUser(user);
    }

    public void sellAsset(Asset asset, Long assetId, String userEmail) {
        Asset assetToUpdate = assetRepository.findById(assetId)
                .orElseThrow(()->new IllegalStateException(
                        "asset with id " + assetId + " does not exist"));

        if (assetToUpdate.getAssetQuantity() < asset.getAssetQuantity()) {
            throw new IllegalStateException("Requested quantity exceeds quantity owned");
        } else if (assetToUpdate.getAssetQuantity() == asset.getAssetQuantity()) {
            assetRepository.deleteById(assetId);
        } else if (assetToUpdate.getAssetQuantity() > asset.getAssetQuantity()) {
            assetToUpdate.setAssetQuantity(assetToUpdate.getAssetQuantity() - asset.getAssetQuantity());
            assetRepository.save(assetToUpdate);
        }
        userService.updateCashBalance(userEmail, asset.getAssetQuantity() * asset.getCurrentAssetPrice());
    }

    public Asset getAssetById(Long assetId) {
        return assetRepository.findById(assetId)
                .orElseThrow(() -> new IllegalStateException("Asset with id " + assetId + " does not exist"));
    }
}


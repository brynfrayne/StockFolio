package com.example.demo.asset;

import com.example.demo.config.JwtService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public List<Asset> getAssetsByEmail(String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        return assetRepository.findAllByUser(user);
    }

    public void addNewAsset(Asset asset, String userEmail) {
        if (assetRepository.findAssetByName(asset.getName()).isPresent()) {
            throw new IllegalStateException("Asset already exists. Add to pre-existing asset.");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException("User with email " + userEmail + " does not exist"));

        if (user.getCashBalance() < asset.getAssetQuantity() * asset.getCurrentAssetPrice()) {
            throw new IllegalStateException("User does not have enough cash to purchase asset");
        }

        userService.subtractFromCashBalance(userEmail, asset.getAssetQuantity() * asset.getCurrentAssetPrice());

        asset.setUser(user);

        assetRepository.save(asset);
    }
    public void addToPreexistingAsset(Asset asset, String userEmail) {
        Asset assetToUpdate = assetRepository.findAssetByName(asset.getName())
                .orElseThrow(() -> new IllegalStateException("Asset with name " + asset.getName() + " does not exist"));

        Double currentTotalAssetCostBasis = assetToUpdate.getAssetCostBasis()*assetToUpdate.getAssetQuantity();
        Double transactionTotalAssetCostBasis = asset.getAssetCostBasis()*asset.getAssetQuantity();
        Integer totalAssetQuantity = assetToUpdate.getAssetQuantity() + asset.getAssetQuantity();
        Double averageAssetCostBasis = (currentTotalAssetCostBasis + transactionTotalAssetCostBasis) / totalAssetQuantity;

        assetToUpdate.setAssetCostBasis(averageAssetCostBasis);
        assetToUpdate.setAssetQuantity(totalAssetQuantity);
        assetToUpdate.addPurchaseDate(asset.getPurchaseDate(0));

        assetRepository.save(assetToUpdate);

        userService.subtractFromCashBalance(userEmail, asset.getAssetQuantity() * asset.getCurrentAssetPrice());
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
        userService.addToCashBalance(userEmail, asset.getAssetQuantity() * asset.getCurrentAssetPrice());
    }

    public Boolean checkAssetExists(Asset asset) {
        return assetRepository.findAssetByName(asset.getName()).isPresent();
    }


}


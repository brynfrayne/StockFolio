package com.example.MyPortfolioApplication.asset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping(path = "api/v1/asset")
public class AssetController {
    @Autowired
    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping
    public List<Asset> getAssets() {
        return assetService.getAssets();
    }

    @PostMapping
    public void addNewAsset(@RequestBody Asset asset) {
        assetService.addNewAsset(asset);
    }

    @DeleteMapping(path = "{assetId}")
    public void deleteAsset(@PathVariable("assetId") Long assetId) {
        assetService.deleteAsset(assetId);
    }

    @PutMapping(path = "{assetId}")
    public void updateAsset(
            @PathVariable("assetId") Long assetId,
            @RequestParam(required = false) Integer assetQuantity,
            @RequestParam() String name) {
        assetService.updateAsset(assetId,assetQuantity, name);
    }
}

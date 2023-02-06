package com.example.demo.asset;

import com.example.demo.config.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/asset")
public class AssetController {
    @Autowired
    private final AssetService assetService;
    @Autowired
    private JwtService jwtService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping
    public List<Asset> getAssets(HttpServletRequest request, @RequestHeader("Authorization") String token) {
        String[] tokenArray = token.split(" ");
        token = tokenArray[1];
        String userEmail = jwtService.extractUsernameFromCookie(token);
        return assetService.getAssetsByEmail(userEmail);
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


package com.example.demo.asset;

import com.example.demo.config.JwtService;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/asset")
public class AssetController {
    @Autowired
    private final AssetService assetService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserService userService;

    @GetMapping
    public List<Asset> getAssets(HttpServletRequest request, @RequestHeader("Authorization") String token) {
        String userEmail = jwtService.parseToken(token);
        return assetService.getAssetsByEmail(userEmail);
    }

    @PostMapping
    public void addNewAsset(@RequestBody Asset asset) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        assetService.addNewAsset(asset, userEmail);
    }

//    @DeleteMapping(path = "{assetId}")
//    public void deleteAsset(@PathVariable("assetId") Long assetId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userEmail = authentication.getName();
//        Asset asset = assetService.getAssetById(assetId);
//        Double assetPrice = asset.getCurrentAssetPrice();
//        assetService.deleteAsset(assetId, assetPrice, userEmail);
//    }


    @PutMapping(path = "{assetId}")
    public void sellAsset(@RequestBody Asset asset, @PathVariable("assetId") Long assetId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        assetService.sellAsset(asset, assetId, userEmail);
    }


}


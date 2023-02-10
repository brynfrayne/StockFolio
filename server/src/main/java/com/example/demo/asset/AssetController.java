package com.example.demo.asset;

import com.example.demo.config.JwtService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

//    public AssetController(AssetService assetService,
//                           UserRepository userRepository) {
//        this.assetService = assetService;
//        this.userRepository = userRepository;
//    }

    @GetMapping
    public List<Asset> getAssets(HttpServletRequest request, @RequestHeader("Authorization") String token) {
        String userEmail = jwtService.parseToken(token);
        return assetService.getAssetsByEmail(userEmail);
    }

    @PostMapping
    public void addNewAsset(@RequestBody Asset asset, @RequestHeader("Authorization") String token) {
        String userEmail = jwtService.parseToken(token);
        assetService.addNewAsset(asset, userEmail);
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


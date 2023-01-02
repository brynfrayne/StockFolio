package myspringportfolio.controller;
import myspringportfolio.model.Asset;
import myspringportfolio.service.AssetService;
import myspringportfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/asset")
public class AssetController {
    private final AssetService assetService;
    // private final PortfolioService portfolioService;

    public AssetController(AssetService assetService, PortfolioService portfolioService) {
        this.assetService = assetService;
        // this.portfolioService = portfolioService;
    }

    @PutMapping("/{id}")
    public Asset updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        Asset assetToUpdate = assetService.getAssetByName(asset.getName());

        assetToUpdate.setAssetQuantity(asset.getAssetQuantity());
        assetToUpdate.setCurrentAssetPrice(asset.getCurrentAssetPrice());
        assetToUpdate.setAssetCostBasis(asset.getAssetCostBasis());

        return assetService.updateAsset(id, assetToUpdate);
    }
}

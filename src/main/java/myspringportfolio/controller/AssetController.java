package myspringportfolio.controller;
import myspringportfolio.model.Asset;
import myspringportfolio.service.AssetService;
import myspringportfolio.service.PortfolioService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.validation.Valid;



@Controller
@RequestMapping("/asset")
public class AssetController {
    private final AssetService assetService;
    // private final PortfolioService portfolioService;

    public AssetController(AssetService assetService, PortfolioService portfolioService) {
        this.assetService = assetService;
        // this.portfolioService = portfolioService;
    }

    //get asset values
    @GetMapping("/{id}")
    public Asset getAsset(@Valid @RequestBody Asset asset) {
        return assetService.getAssetByName(asset.getName());
    }

    // update asset value(s)
    @PutMapping("/{id}")
    public Asset updateAsset(@RequestBody Asset asset) {
        Asset assetToUpdate = assetService.getAssetByName(asset.getName());
        assetToUpdate.setAssetQuantity(asset.getAssetQuantity());
        assetToUpdate.setCurrentAssetPrice(asset.getCurrentAssetPrice());
        assetToUpdate.setAssetCostBasis(asset.getAssetCostBasis());
        return assetService.updateAsset(assetToUpdate);
    }

    // add new asset
    @PostMapping("/{id}")
    public Asset addAsset(@Valid @RequestBody Asset asset) {
        asset.setName(asset.getName());
        asset.setType(asset.getType());
        asset.setAssetQuantity(asset.getAssetQuantity());
        asset.setCurrentAssetPrice(asset.getCurrentAssetPrice());
        asset.setAssetCostBasis(asset.getAssetCostBasis());
        asset.setCurrentTotalValue(asset.getCurrentTotalValue());
        asset.setTotalCostBasis(asset.getTotalCostBasis());
        asset.setPercentGain(asset.getPercentGain());
        asset.setDatePurchased(asset.getDatePurchased());
        return assetService.addAsset(asset);
    }

    // delete asset
    @PostMapping("/{id}")
    public void deleteAsset(@Valid @RequestBody Asset asset) {
        Asset assetToDelete = assetService.getAssetByName(asset.getName());
        assetService.deleteAsset(assetToDelete);
    }

}

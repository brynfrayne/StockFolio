package myspringportfolio.service;
import myspringportfolio.model.Portfolio;
import myspringportfolio.model.Asset;
import myspringportfolio.repository.PortfolioRepository;
import myspringportfolio.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private AssetRepository assetRepository;

    public Portfolio createPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(long id) {
        portfolioRepository.deleteById(id);
    }

    public List<Asset> getAssets(long portfolioId) {
        Optional<Portfolio> portfolio = portfolioRepository.findById(portfolioId);
        if (portfolio.isPresent()) {
            return portfolio.get().getAssets();
        }
        return null;
    }

    public Asset addAsset(long portfolioId, Asset asset) {
        // i want to add a new asset to a portfolio
        // the asset will be created by the user with a form
        // the user will only have one portfolio and it will automatically be the one chosen
        // how do i create a new asset and add it to the portfolio?
        asset.setPortfolio(portfolioRepository)



        // Optional<Portfolio> portfolio = portfolioRepository.findById(portfolioId);
        // i want to find a portfolio based on its name which has portfolio and the user name
        // Optional<Portfolio> portfolio = portfolioRepository.findByString("Portfolio_" + portfolioId);
        // if (portfolio.isPresent()) {
        //     Portfolio p = portfolio.get();
        //     asset.setPortfolio(p);
        //     return assetRepository.save(asset);
        // }
        // return null;
    }

    public Asset updateAsset(long portfolioId, long assetId, Asset asset) {
        Optional<Portfolio> portfolio = portfolioRepository.findById(portfolioId);
        if (portfolio.isPresent()) {
            Optional<Asset> existingAsset = assetRepository.findById(assetId);
            if (existingAsset.isPresent()) {
                Asset a = existingAsset.get();
                a.setName(asset.getName());
                a.setType(asset.getType());
                a.setAssetQuantity(asset.getAssetQuantity());
                a.setCurrentAssetPrice(asset.getCurrentAssetPrice());
                a.setAssetCostBasis(asset.getAssetCostBasis());
                a.setCurrentTotalValue(asset.getCurrentTotalValue());
                a.setTotalCostBasis(asset.getTotalCostBasis());
                a.setPercentGain(asset.getPercentGain());
                a.setDatePurchased(asset.getDatePurchased());
                return assetRepository.save(a);
            }
        }
        return null;
    }

    public void deleteAsset(long portfolioId, long assetId) {
        Optional<Portfolio> portfolio = portfolioRepository.findById(portfolioId);
        if (portfolio.isPresent()) {
            Optional<Asset> asset = assetRepository.findById(assetId);
            if (asset.isPresent()) {
                assetRepository.delete(asset.get());
            }
        }
    }
}






























// package myspringportfolio.service;
// import myspringportfolio.model.Portfolio;
// import myspringportfolio.repository.PortfolioRepository;
// import org.springframework.stereotype.Service;
// import java.util.List;
// import java.util.Optional;
// import myspringportfolio.exception.ResourceNotFoundException;
// import myspringportfolio.model.Asset;
// import myspringportfolio.repository.AssetRepository;


// @Service
// public class PortfolioService {

//     private final PortfolioRepository portfolioRepository;

//     public PortfolioService(PortfolioRepository portfolioRepository) {
//         this.portfolioRepository = portfolioRepository;
//     }

//     public List<Portfolio> getAllPortfolios() {
//         return portfolioRepository.findAll();
//     }

//     public Optional<Portfolio> getPortfolioById(long id) {
//         return portfolioRepository.findById(id);
//     }

//     public Portfolio createPortfolio(Portfolio portfolio) {
//         return portfolioRepository.save(portfolio);
//     }

//     public Portfolio updatePortfolio(Portfolio portfolio) {
//         return portfolioRepository.save(portfolio);
//     }

//     public void deletePortfolio(long id) {
//         portfolioRepository.deleteById(id);
//     }

//     public Portfolio updatePortfolio(Long id, Portfolio portfolio) {
//         Portfolio existingPortfolio = portfolioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Portfolio with id " + id + " not found"));
//         existingPortfolio.setName(portfolio.getName());
//         return portfolioRepository.save(existingPortfolio);
//     }

//     public List<Asset> getAssets(Long id) {
//         return portfolio.getAssets();
//     }

//     public Asset addAsset(Long id, Asset asset) {
//         asset.setPortfolio(portfolio);
//         return assetRepository.save(asset);
//     }

//     public Asset updateAsset(Long portfolioId, Long assetId, Asset asset) {
//         Asset existingAsset = assetRepository.findById(assetId).orElseThrow(() -> new ResourceNotFoundException("Asset with id " + asset.getId() + " not found"));
//         existingAsset.setName(asset.getName());
//         existingAsset.setSymbol(asset.getSymbol());
//         existingAsset.setQuantity(asset.getQuantity());
//         existingAsset.setPrice(asset.getPrice());
//         return assetRepository.save(existingAsset);

// }

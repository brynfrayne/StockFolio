package myspringportfolio.service;
import myspringportfolio.model.Portfolio;
import myspringportfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import myspringportfolio.exception.ResourceNotFoundException;
import myspringportfolio.model.Asset;
import myspringportfolio.repository.AssetRepository;


@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    public Optional<Portfolio> getPortfolioById(long id) {
        return portfolioRepository.findById(id);
    }

    public Portfolio createPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(long id) {
        portfolioRepository.deleteById(id);
    }

    public Portfolio updatePortfolio(Long id, Portfolio portfolio) {
        Portfolio existingPortfolio = portfolioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Portfolio with id " + id + " not found"));
        existingPortfolio.setName(portfolio.getName());
        existingPortfolio.setDescription(portfolio.getDescription());
        return portfolioRepository.save(existingPortfolio);
    }

    public List<Asset> getAssets(Long id) {
        return portfolio.getAssets();
    }

    public Asset addAsset(Long id, Asset asset) {
        asset.setPortfolio(portfolio);
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Long portfolioId, Long assetId, Asset asset) {
        Asset existingAsset = assetRepository.findById(assetId).orElseThrow(() -> new ResourceNotFoundException("Asset with id " + asset.getId() + " not found"));
        existingAsset.setName(asset.getName());
        existingAsset.setSymbol(asset.getSymbol());
        existingAsset.setQuantity(asset.getQuantity());
        existingAsset.setPrice(asset.getPrice());
        return assetRepository.save(existingAsset);

}
